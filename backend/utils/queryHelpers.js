const getPagination = (page, size) => {
  const limit = size ? +size : 10;
  const skip = page ? (page - 1) * limit : 0;
  return { limit, skip };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: items } = data;
  const currentPage = page ? +page : 1;
  const totalPages = Math.ceil(totalItems / limit);

  return {
    items,
    pagination: {
      totalItems,
      totalPages,
      currentPage,
      itemsPerPage: limit
    }
  };
};

const createSearchQuery = (searchTerm, fields) => {
  if (!searchTerm) return {};

  const searchQuery = {
    $or: fields.map(field => ({
      [field]: { $regex: searchTerm, $options: 'i' }
    }))
  };

  return searchQuery;
};

module.exports = {
  getPagination,
  getPagingData,
  createSearchQuery
}; 