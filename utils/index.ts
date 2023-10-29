import { CarProps, FilterProp } from "@/types";

export async function fetchCars(filters: FilterProp) {
    const { manufacturer, year, model, limit, fuel } =
    filters;

    const headers = {
        'X-RapidAPI-Key': '913c4a0d8dmsh5583219c0654e4fp19a4f4jsn14dee9e84c58',
		'X-RapidAPI-Host':'cars-by-api-ninjas.p.rapidapi.com'
    }

    const response = await fetch (`https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`,{
        headers: headers
    });

    const result = await response.json()

    return result;
}

export const calculateCarRent = (city_mpg: number, year: number) => {
    const basePricePerDay = 50; // Base rental price per day in dollars
    const mileageFactor = 0.1; // Additional rate per mile driven
    const ageFactor = 0.05; // Additional rate per year of vehicle age
  
    // Calculate additional rate based on mileage and age
    const mileageRate = city_mpg * mileageFactor;
    const ageRate = (new Date().getFullYear() - year) * ageFactor;
  
    // Calculate total rental rate per day
    const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;
  
    return rentalRatePerDay.toFixed(0);
  };
  
export const generatedCarImageUrl = (car: CarProps, angle?: string) => {
    const url = new URL("http://cdn.imagin.studio/getimage")

    const { make, year, model } = car;

    url.searchParams.append("customer", "hrjavascript-mastery")
    url.searchParams.append("make", make)
    url.searchParams.append("modelFamily", model.split(" ")[0])
    url.searchParams.append("zoomType", "fullScreen")
    url.searchParams.append("modelYear", `${year}`)
    url.searchParams.append("angle", `${angle}`)

    return `${url}`
}

export const updateSearchParams = (type:string, value:string) =>{
    const searchParams = new URLSearchParams(window.location.search)
    
    searchParams.set(type, value)

    const newPathName = `${window.location.pathname}?${searchParams.toString()}`

    return newPathName;
}