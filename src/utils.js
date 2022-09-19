const getQuotes = async () => {
  try {
    const response = await fetch('https://programming-quotes-api.herokuapp.com/Quotes/random');

    return await response.json(); 
  } catch (error) {
    throw error;
  }
};

export {
  getQuotes,
};
