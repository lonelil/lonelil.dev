import { SiRoblox } from "react-icons/si";
import { HiOutlineExternalLink } from "react-icons/hi";
import Image from "next/image";
import { useState, useEffect } from "react";

type RobloxData = {
  LastLocation: String;
  LastOnline: Date;
  PresenceType: Number;
};
export default function Roblox() {
  const [robloxData, setRobloxData] = useState<RobloxData>();
  const [robloxThumbnail, setRobloxThumbnail] = useState("");

  useEffect(() => {
    function fetchRobloxData() {
      fetch("https://api.roproxy.com/users/452443011/onlinestatus/")
        .then((res) => res.json())
        .then((data) => {
          setRobloxData(data);
        });
    }
    function fetchRobloxThumbnail() {
      fetch(
        "https://thumbnails.roproxy.com/v1/users/avatar?userIds=452443011&size=720x720&format=png"
      )
        .then((res) => res.json())
        .then((data) => {
          setRobloxThumbnail(data.data[0].imageUrl);
        });
    }
    fetchRobloxData();
    fetchRobloxThumbnail();
    /*setInterval(function () {
      fetchRobloxData();
    }, 10000);*/
  }, []);

  return (
    <a
      href="https://www.roblox.com/users/452443011/profile"
      target="_blank"
      rel="noreferrer"
      className="relative col-span-3 flex h-52 overflow-hidden rounded-2xl md:col-span-2"
    >
      <div className="flex flex-1 flex-col justify-between p-6 text-white">
        <div className="absolute inset-0 -z-10">
          {robloxThumbnail && (
            <Image
              src={robloxThumbnail}
              className="bg-[url(/roblox-backgrounds/dark.png)] bg-cover bg-bottom bg-no-repeat object-cover brightness-50"
              fill
              alt="lonelilaf"
            />
          )}
        </div>
        <div className="flex justify-between">
          <SiRoblox className="text-2xl" />
          <HiOutlineExternalLink className="text-xl opacity-50" />
        </div>

        <div className="space-y-0.5">
          <h2 className="font-title font-bold">lonelilaf</h2>
          <p className="text-sm">
            {robloxData?.LastLocation}
            {robloxData?.PresenceType === 0 &&
              `, since ${new Intl.DateTimeFormat("en", {
                hour: "numeric",
                minute: "numeric",
              }).format(new Date(robloxData.LastOnline))}`}
            .
          </p>
        </div>
      </div>
    </a>
  );
}
