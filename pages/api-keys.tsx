import { ApiKey } from "@prisma/client";
import Head from "next/head";
import { useCallback, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { MdContentCopy, MdDelete } from "react-icons/md";
import useSWR from "swr";
import { Button } from "../components/atoms/buttons/Button";
import { AuthedLayout } from "../components/layouts/AuthedLayout";
import useUser from "../hooks/useUser";
import { generateApiKeyAndPrefix } from "../lib/api-keys/apiKeyUtils";
import fetchJson from "../lib/fetchJson";

type CreateApiKeyFormType = {
  name: string;
  prefix: string;
  apiKey: string;
};

export default function ApiKeys() {
  const { user } = useUser({ redirectTo: "/login" });
  const {
    data: apiKeys,
    mutate,
    isValidating,
  } = useSWR<ApiKey[]>("/api/api-keys", fetchJson);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const [generatedPrefix, setGeneratedPrefix] = useState<string>("");
  const [generatedApiKey, setGeneratedApiKey] = useState<string>("");

  const { register, handleSubmit, setValue } = useForm<CreateApiKeyFormType>({
    defaultValues: { prefix: generatedPrefix, apiKey: generatedApiKey },
  });

  const generateNewKeys = useCallback(() => {
    const { prefix, apiKey } = generateApiKeyAndPrefix();
    setGeneratedPrefix(prefix);
    setGeneratedApiKey(apiKey);
    setValue("prefix", prefix);
    setValue("apiKey", apiKey);
  }, [setGeneratedPrefix, setGeneratedApiKey, setValue]);

  const showDialog = () => {
    generateNewKeys();
    dialogRef.current?.showModal();
  };
  const [errorMsg, setErrorMsg] = useState<string>("");

  const onSubmit = async (data: CreateApiKeyFormType) => {
    const { error: errorMessage } = await fetch("/api/api-keys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());
    if (errorMessage) {
      setErrorMsg(errorMessage);
    } else {
      mutate();
      dialogRef.current?.close();
    }
  };

  const deleteApiKey = async (apiKeyId: number) => {
    await fetch(`/api/api-keys/${apiKeyId}`, { method: "DELETE" });
    mutate();
  };

  const copyTextToClipboard = async (text: string) => {
    if ("clipboard" in navigator) {
      return navigator.clipboard.writeText(text);
    } else {
      // Use fallback if clipboard API is not available (e.g. in IE).
      return document.execCommand("copy", true, text);
    }
  };

  return (
    <AuthedLayout user={user}>
      <Head>
        <title>API Template Project - API keys</title>
      </Head>
      <div className="max-w-screen-lg mx-auto px-5 pt-4">
        <h1 className="text-4xl font-bold text-center mb-8">Manage API keys</h1>
        <div className="bg-white rounded-lg drop-shadow-lg border border-slate-200 px-6 py-4">
          <div className="flex gap-4 items-center">
            <h2 className="mb-2">All API keys</h2>
            <Button onClick={showDialog} size="xs" className="max-h-full">
              Create new API key
            </Button>
          </div>
          <table className="border-collape border border-slate-200">
            <thead className="bg-slate-100 text-left">
              <tr>
                <th className="border border-slate-300 p-4 font-semibold">
                  Name
                </th>
                <th className="border border-slate-300 p-4 font-semibold">
                  Prefix
                </th>
                <th className="border border-slate-300 p-4 font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {apiKeys?.map(({ id, name, prefix }) => (
                <tr key={id}>
                  <td className="border border-slate-300 p-4">{name}</td>
                  <td className="border border-slate-300 p-4">{prefix}</td>
                  <td className="border border-slate-300 p-4">
                    <Button
                      colourScheme="danger"
                      onClick={() => deleteApiKey(id)}
                      disabled={isValidating}
                    >
                      <MdDelete className="text-xl" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <dialog
        ref={dialogRef}
        className="bg-white border border-slate-300 rounded-lg px-8 py-6 backdrop:bg-slate-500 backdrop:bg-opacity-50 backdrop:top-0 backdrop:right-0 backdrop:bottom-0 backdrop:left-0 backdrop:absolute"
      >
        <h2 className="mb-2">Create new API key</h2>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-3">
            <label>Name</label>
            <input
              {...register("name", { required: true })}
              placeholder="my-api-key"
              className="border border-slate-300 p-2 rounded-lg"
            />
          </div>
          <input {...register("prefix")} type="hidden" />
          <input {...register("apiKey")} type="hidden" />
          <div className="flex flex-col gap-3">
            <label>API key</label>
            <div className="flex gap-1 w-full">
              <span className="px-2 py-2 border rounded-lg text-slate-500 bg-slate-100 flex-grow text-center">
                {generatedPrefix}.{generatedApiKey}
              </span>
              <Button
                type="button"
                colourScheme="primary"
                onClick={() =>
                  copyTextToClipboard(`${generatedPrefix}.${generatedApiKey}`)
                }
              >
                <MdContentCopy className="text-xl" />
              </Button>
            </div>
            <p className="text-sm text-slate-500 italic">
              Make sure to save the API key before saving it, as it will never
              be shown again.
            </p>
          </div>
          <div className="mt-4 flex justify-center">
            <Button>Save API key</Button>
          </div>
          {errorMsg && <p className="py-2 text-red-500 italic">{errorMsg}</p>}
        </form>
      </dialog>
    </AuthedLayout>
  );
}
