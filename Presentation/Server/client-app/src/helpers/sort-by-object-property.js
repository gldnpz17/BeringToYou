const sortByObjectProperty = (objects, propertyName) => {
  return objects.sort((previous, next) => {
    if (previous[propertyName] < next[propertyName]) {
      return -1;
    } else if (previous[propertyName] > next[propertyName]) {
      return 1
    } else {
      return 0
    }
  });
};

export default sortByObjectProperty;