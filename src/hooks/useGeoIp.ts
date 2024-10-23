import { useQuery } from "@tanstack/react-query";
import { getGeoIP } from "~/api-client";
import type { GeoIPResponse } from "~/types/geoip";

export function useGeoIp() {
  const { data: geoIP } = useQuery<GeoIPResponse | undefined>({
    queryKey: ["geoIP"],
    queryFn: () => getGeoIP(),
    staleTime: Infinity,
  });

  return { geoIP };
}
