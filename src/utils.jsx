export const bigintToFloat = (bigInt) => {
    if (bigInt < 100)
      return `${bigInt}.0`
    else
      return `${bigInt / 100}.${bigInt % 100}`
  }
