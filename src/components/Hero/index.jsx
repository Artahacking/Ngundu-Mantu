import { Box, Container, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { transition, parentVariants } from "@/animation/transition";
import { motion } from "framer-motion";
import useDB from "@/hooks/useDB";
import { useLocation } from "react-router-dom";

const imageVariants = {
  hidden: { scale: 2, opacity: 0 },
  show: { scale: 1, opacity: 1, transition },
  exit: { opacity: 0 },
};

const textVariants = {
  hidden: { opacity: 0, y: "80%", skewY: 10 },
  show: { opacity: 1, y: 0, skewY: 0, transition },
  exit: { opacity: 0 },
};

const dividerVariants = {
  hidden: { scaleX: 0, originX: 0 },
  show: { scaleX: 1, originX: 0, transition },
  exit: { opacity: 0 },
};

const useQueryParams = () => {
  return new URLSearchParams(useLocation().search);
};

const useCountdown = (targetDate) => {
  const [timeLeft, setTimeLeft] = useState(calcTimeLeft());

  function calcTimeLeft() {
    const now = new Date();
    const difference = targetDate - now;

    if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calcTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  return timeLeft;
};

const Hero = () => {
  const { hero, wedding } = useDB((db) => db);
  const searchParams = useQueryParams();
  const countdownDate = new Date("2025-05-05T00:00:00");
  const { days, hours, minutes, seconds } = useCountdown(countdownDate);

  let namaUndangan = searchParams.get("nama");
  if (!namaUndangan || namaUndangan.trim() === "") {
    namaUndangan = "Tamu Undangan";
  } else {
    namaUndangan = namaUndangan
      .replace(/%20/g, " ")
      .replace(/%26/g, "&")
      .replace(/%2C/g, ",");
  }

  const mempelaiPria = wedding.mempelai.pria.namaDepan;
  const mempelaiWanita = wedding.mempelai.wanita.namaPanggilan;
  const mempelai = `${mempelaiPria} & ${mempelaiWanita}`;
  const undangan = "Ngunduh Mantu";

  return (
    <motion.div
      variants={parentVariants}
      initial="hidden"
      whileInView="show"
      exit="exit"
      viewport={{ once: true }}
    >
      <Box
        sx={{
          height: "100vh",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Box
          component={motion.img}
          alt="Hero background"
          variants={imageVariants}
          src={hero.banner}
          sx={{
            objectFit: "cover",
            objectPosition: "bottom center",
            width: "100%",
            height: "100vh",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100vh",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundImage: ({ palette }) => {
              return `linear-gradient(to bottom, transparent, ${palette.background.default})`;
            },
          }}
        >
          <Container>
            {/* Nama Tamu Undangan */}
            <Typography
              variant="h6"
              sx={{
                textAlign: "center",
                fontSize: { md: 30, xs: 18 },
                mb: 2,
                color: "white",
              }}
            >
              {`Kepada Bapak/Ibu/Saudara/i `}
              <span style={{ color: "#D4AF37" }}>{namaUndangan}</span>
            </Typography>

            <Typography
              variant="h6"
              sx={{
                textAlign: "center",
                fontSize: { md: 25, xs: 16 },
                mb: 3,
              }}
            >
              Kami Mengundang Anda Untuk Hadir Di Acara Pernikahan Kami.
            </Typography>

            {/* Countdown Timer */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: { md: 4, xs: 2 },
                mb: 3,
                flexWrap: "nowrap",
              }}
            >
              {[{ label: "Hari", value: days }, { label: "Jam", value: hours }, { label: "Menit", value: minutes }, { label: "Detik", value: seconds }].map((item, key) => (
                <Box
                  key={key}
                  sx={{
                    width: { md: 90, xs: 70 },
                    height: { md: 90, xs: 70 },
                    borderRadius: 2,
                    bgcolor: "#D4AF37", // Gold Elegan
                    color: "black",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: 3,
                  }}
                >
                  <Typography variant="h5" sx={{ fontSize: { md: 28, xs: 18 }, fontWeight: "bold" }}>
                    {item.value}
                  </Typography>
                  <Typography variant="caption" sx={{ fontSize: { md: 16, xs: 12 } }}>
                    {item.label}
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Nama Mempelai */}
            <Typography variant="h5" sx={{ textAlign: "center", fontSize: { md: 40, xs: 25 }, mb: 1 }}>
              {undangan}
            </Typography>

            <Typography variant="h3" sx={{ textAlign: "center", fontSize: { md: "6em", xs: "3em" }, mb: 2, color: "#D4AF37" }}>
              {mempelai}
            </Typography>

            <Box component={motion.div} variants={dividerVariants} sx={{ borderBottom: 2, width: "80%", mx: "auto" }} />

            <Typography variant="h5" sx={{ textAlign: "center", fontSize: { md: "2.5em", xs: "1.5em" }, mt: 2 }}>
              {wedding.resepsi.tanggal}
            </Typography>
          </Container>
        </Box>
      </Box>
    </motion.div>
  );
};

export default Hero;
