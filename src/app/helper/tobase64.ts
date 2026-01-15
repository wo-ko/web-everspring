export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject("Cannot convert file to base64");
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(file); // 🔥 base64
  });
}
