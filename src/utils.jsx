export const bigintToFloat = (bigInt) => {
  const dollars = bigInt / 100;
  return dollars;
}

export const DateTime = ({ dateTimeString }) => {
  const parseDateTime = (dateTimeString) => {
    const str = dateTimeString.split('.')[0]
    const dateObj = new Date(str);

    // Format date
    const formattedDate = dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

    // Format time
    const formattedTime = dateObj.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });

    return {
      formattedDate,
      formattedTime,
    };
  };

  const { formattedDate, formattedTime } = parseDateTime(dateTimeString);

  return (
    <div>
      <span class="icon-text">
        <span class="icon">
          <i class="fas fa-calendar"></i>
        </span>
        <span>{formattedDate}</span>
      </span>
      {' '}
      <span class="icon-text">
        <span class="icon">
          <i class="fas fa-clock"></i>
        </span>
        <span>{formattedTime}</span>
      </span>
    </div>
  );
};

export const Nickname = ({ username }) => {
  return (
    <span class="icon-text">
      <span class="icon">
        <i class="fas fa-user"></i>
      </span>
      <span >{username}</span>
    </span>
  );
}

export const Payment = ({ userId, amount }) => {
  return (
    <div>
      <span class="icon-text">
        <span class="icon">
          <i class="fas fa-user"></i>
        </span>
        <span >{`${userId} `}</span>
      </span>
      <span class="icon-text">
        <span class="icon">
          <i style={{paddingLeft: 20}} class="fas fa-money-bill"></i>
        </span>
        <span style={{paddingLeft: 10}}>${amount}</span>
      </span>
    </div>
  );
}