export function translateSubjectType(code) {
  if (code === "COMMON") {
    return "공통선택"
  } else if (code === "SERIES") {
    return "계열선택"
  } else if (code === "COURSE") {
    return "과정선택"
  } else if (code === "FREE") {
    return "자유선택"
  }
}

export function translateSubjectArea(code) {
  if (code === "EXPLORATION") {
    return "탐구"
  } else if (code === "PRO") {
    return "전문"
  } else if (code === "PRO1") {
    return "전문1"
  } else if (code === "PRO2") {
    return "전문2"
  } else if (code === "CULTURE") {
    return "생활과 교양"
  } else if (code === "CARERR") {
    return "진로"
  } else if (code === "FOUNDATION") {
    return "기초"
  } else if (code === "PEANDART") {
    return "예술 체육"
  } else if (code === "COMMON") {
    return "공통"
  } else if (code === "GENERAL") {
    return "일반"
  }
}

export function translateSubjectDifficulty(code) {
  if (code === "BASIC") {
    return "일반"
  } else if (code === "HONOR") {
    return "고급"
  } else if (code === "BILINGUAL") {
    return "이중언어"
  }
}
