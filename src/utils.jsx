export const bigintToFloat = (bigInt) => {
    if (bigInt < 100)
      return `0.0${bigInt % 100}`
    else
      return `${bigInt / 100}.${bigInt % 100}`
  }
