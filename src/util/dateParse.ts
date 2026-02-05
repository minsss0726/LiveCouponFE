/**
 * 다양한 형식의 날짜/시간 문자열을 파싱하여 timestamp(ms)로 반환합니다.
 * - ISO: "2026-02-01T00:00:00"
 * - 공백 구분: "2026-02-01 00:00:00"
 * - 한글 표기: "2026년 02월 01일 00:00:00"
 * 파싱 실패 시 NaN을 반환합니다.
 */
export const parseEventDatetime = (value: string): number => {
  const trimmed = (value || "").trim();
  let date = new Date(trimmed);
  if (!Number.isNaN(date.getTime())) return date.getTime();
  const spaceAsIso = trimmed.replace(" ", "T");
  date = new Date(spaceAsIso);
  if (!Number.isNaN(date.getTime())) return date.getTime();
  const koreanMatch = trimmed.match(
    /(\d{4})년\s*(\d{1,2})월\s*(\d{1,2})일\s*(\d{1,2}):(\d{1,2}):(\d{1,2})/
  );
  if (koreanMatch) {
    const [, y, mo, d, h, min, s] = koreanMatch.map(Number);
    date = new Date(y, mo - 1, d, h, min, s);
    return date.getTime();
  }
  return NaN;
};
