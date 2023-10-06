import { ApiKey } from "@prisma/client";
import Head from "next/head";
import { useCallback, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { MdContentCopy, MdDelete } from "react-icons/md";
import useSWR from "swr";
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
      <div className="mx-auto max-w-screen-lg px-5 pt-4">
        <h1 className="mb-8 text-center text-4xl font-bold">Manage API keys</h1>
        <div className="rounded-lg border border-slate-200 bg-white px-6 py-4 drop-shadow-lg">
          <div className="flex items-center gap-4">
            <h2 className="mb-2">All API keys</h2>
            <button onClick={showDialog} className="btn btn-xs">
              Create new API key
            </button>
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
                  <td className="border border-slate-300 p-4 text-center">
                    <button
                      onClick={() => deleteApiKey(id)}
                      disabled={isValidating}
                      className="btn btn-error btn-sm"
                    >
                      <MdDelete className="text-xl" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <dialog
        ref={dialogRef}
        className="rounded-lg border border-slate-300 bg-white px-8 py-6 backdrop:absolute backdrop:top-0 backdrop:right-0 backdrop:bottom-0 backdrop:left-0 backdrop:bg-slate-500 backdrop:bg-opacity-50"
      >
        <h2 className="mb-2">Create new API key</h2>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-3">
            <label>Name</label>
            <input
              {...register("name", { required: true })}
              placeholder="my-api-key"
              className="rounded-lg border border-slate-300 p-2"
            />
          </div>
          <input {...register("prefix")} type="hidden" />
          <input {...register("apiKey")} type="hidden" />
          <div className="flex flex-col gap-3">
            <label>API key</label>
            <div className="flex w-full gap-1">
              <span className="flex-grow rounded-lg border bg-slate-100 px-2 py-2 text-center text-slate-500">
                {generatedPrefix}.{generatedApiKey}
              </span>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() =>
                  copyTextToClipboard(`${generatedPrefix}.${generatedApiKey}`)
                }
              >
                <MdContentCopy className="text-xl" />
              </button>
            </div>
            <p className="text-sm italic text-slate-500">
              Make sure to save the API key before saving it, as it will never
              be shown again.
            </p>
          </div>
          <div className="mt-4 flex justify-center">
            <button className="btn btn-primary">Save API key</button>
          </div>
          {errorMsg && <p className="py-2 italic text-red-500">{errorMsg}</p>}
        </form>
      </dialog>
    </AuthedLayout>
  );
}
