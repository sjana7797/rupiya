"use client";

import { useEffect, type ReactNode } from "react";
import { useGeoIp } from "~/hooks/useGeoIp";
import { api } from "~/trpc/react";

type Props = {
  children: ReactNode;
};

const InitialSetup = ({ children }: Props) => {
  // server interaction
  const { mutateAsync } = api.ips.setIpsAndDevice.useMutation();
  const { geoIP } = useGeoIp();

  useEffect(() => {
    if (geoIP?.ip) {
      const ip = geoIP?.ip;
      const fetchData = async () => {
        const data = await mutateAsync({
          deviceId: localStorage.getItem("deviceId") ?? null,
          ip,
        });

        if (data.userId) localStorage.setItem("deviceId", data.userId);
      };
      void fetchData();
    }
  }, [geoIP, mutateAsync]);
  return <>{children}</>;
};

export default InitialSetup;
