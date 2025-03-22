export const convertToKoreanDate = (utcString: string) => {
  const utcDate = new Date(utcString);
  const koreaTime = new Date(utcDate.getTime() + 9 * 60 * 60 * 1000); // UTC+9 적용

  const year = koreaTime.getFullYear();
  const month = String(koreaTime.getMonth() + 1).padStart(2, '0');
  const day = String(koreaTime.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};
