function base64ToFile(base64String: string, fileName: string): File {
  // 去掉base64头部声明信息，只保留数据部分
  const base64Data = base64String.replace(/^data:image\/\w+;base64,/, '');

  // 将base64字符串转换为Uint8Array
  const binaryArray = new Uint8Array(
    atob(base64Data)
      .split('')
      .map((char) => char.charCodeAt(0))
  );

  // 创建Blob对象
  const blob = new Blob([binaryArray], { type: 'image/*' });

  // 创建File对象
  const file = new File([blob], fileName, { type: blob.type });

  return file;
}

export default base64ToFile;
