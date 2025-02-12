const minDelay = 100;
const maxDelay = 1000;

export const mockRandomDelay = (): Promise<void> => {
  return new Promise((resolve) => {
    const delay = Math.random() * (maxDelay - minDelay) + minDelay;
    setTimeout(resolve, delay);
  });
};
