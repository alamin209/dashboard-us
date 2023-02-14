import { useState, useEffect } from "react";

// API
import { getCountries, getStates, getCities } from "api/geo-data";

const useGeo = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [isCountryLoading, setIsCountryLoading] = useState(false);
  const [isStateLoading, setIsStateLoading] = useState(false);
  const [isCityLoading, setIsCityLoading] = useState(false);

  // Format Select Options
  const formatOptions = (data) => {
    return data.map((item) => {
      return {
        label: item.name,
        value: item._id,
      };
    });
  };

  const fetchCountries = async () => {
    try {
      setIsCountryLoading(true);
      const countries = await getCountries();
      setCountries(countries.data);
    } catch (error) {
      setCountries([]);
    } finally {
      setIsCountryLoading(false);
    }
  };

  const fetchStates = async (country) => {
    try {
      setIsStateLoading(true);
      const states = await getStates(country);
      setStates(states.data);
    } catch (error) {
      setStates([]);
    } finally {
      setIsStateLoading(false);
    }
  };

  const fetchCities = async (state) => {
    try {
      setIsCityLoading(true);
      const cities = await getCities(state);
      setCities(cities.data);
    } catch (error) {
      setCities([]);
    } finally {
      setIsCityLoading(false);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  return {
    countries,
    states,
    cities,
    setCountries,
    setStates,
    setCities,
    fetchCountries,
    fetchStates,
    fetchCities,
    isCountryLoading,
    isStateLoading,
    isCityLoading,
    formatOptions,
  };
};

export default useGeo;
