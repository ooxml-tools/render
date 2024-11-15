export async function render(inputPath: string, outputPath: string) {
  throw new Error(`onedrive not yet supported`);
}

export async function isSupported() {
  // TODO: Check if auth keys are present
  return false;
}
