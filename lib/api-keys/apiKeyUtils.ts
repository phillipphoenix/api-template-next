type ApiKeyAndPrefix = {
  prefix: string;
  apiKey: string;
};

const availableCharsString =
  "1234567890_-aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ";
const availableChars = Array.from(availableCharsString);

export const generateApiKeyAndPrefix = (): ApiKeyAndPrefix => {
  const prefixCharCount = 8;
  const apiKeyCharCount = 32;

  let prefix = "";
  let apiKey = "";
  for (let i = 0; i < Math.max(prefixCharCount, apiKeyCharCount); i++) {
    if (i < prefixCharCount) {
      prefix +=
        availableChars[Math.floor(availableChars.length * Math.random())];
    }
    if (i < apiKeyCharCount) {
      apiKey +=
        availableChars[Math.floor(availableChars.length * Math.random())];
    }
  }

  return { prefix, apiKey };
};
