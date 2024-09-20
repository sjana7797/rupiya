import { geolocation, ipAddress } from "@vercel/functions";
import { countryList } from "~/constants/countries";

export function GET(request: Request) {
  const geo = geolocation(request);

  const ip = ipAddress(request);

  // Find the country name from the country list based on the country code in the geoIP data
  const countryName =
    countryList.find((country) => country.id === geo?.country)?.name ?? "";
  const decodedCity = decodeURIComponent(geo.city ?? "");
  return Response.json(
    {
      ...geo,
      city: decodedCity,
      ip,
      countryName,
    },
    { status: 200 },
  );
}
