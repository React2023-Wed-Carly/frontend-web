export const bigintToFloat = (bigInt) => {
  return `${bigInt / 100}.${bigInt % 100}`
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
