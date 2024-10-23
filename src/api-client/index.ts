import axios from "axios";
import type { GeoIPResponse } from "~/types/geoip";

export const getGeoIP = async () => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const response = await axios.get<GeoIPResponse>("/api/geoip");
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
