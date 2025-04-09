import { parentVariants, transition } from "@/animation/transition";
import useDB from "@/hooks/useDB";
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import { motion } from "framer-motion";
import TextMask from "../TextMask";
import KeluargaBesar from "./KeluargaBesar";

/**
 * Text variant
 */
const textVariants = {
  hidden: {
    opacity: 0,
    y: "80%",
    skewY: 10,
  },
  show: {
    opacity: 1,
    y: 0,
    skewY: 0,
    transition,
  },
  exit: {
    opacity: 0,
  },
};

/**
 * Divider variant
 */
const dividerVariants = {
  hidden: {
    scaleX: 0,
    originX: 0.5,
  },
  show: {
    scaleX: 1,
    originX: 0.5,
    transition,
  },
  exit: {
    opacity: 0,
  },
};

/**
 * Footer komponen
 */
const Footer = () => {
  const { pria, wanita } = useDB((db) => db.wedding.mempelai);
  const doaRestu =
    "Doa Restu Anda merupakan karunia yang sangat berarti bagi kami.";
  const berbahagia = "Kami Yang Berbahagia";

  return (
    <Box
      component={motion.div}
      variants={parentVariants}
      initial="hidden"
      whileInView="show"
      exit="exit"
      viewport={{ once: true }}
      py={18}
      sx={{
        position: "relative",
        overflow: "hidden",
        color: "#fff",
        fontWeight: "bold",
        backgroundImage:
          'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyK-NUNCyYeXqN1Qe5qUqTljvy8jyAIXQlMpIlC3R7jbcGsdvcQ47V52wYx4M4bHbbGWY&usqp=CAU")',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "bottom center",
        backgroundAttachment: "scroll",
        imageRendering: "auto", // mencegah gambar pecah
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.4)", // overlay gelap
          backdropFilter: "blur(1px)", // sedikit blur untuk kontras
          zIndex: 0,
        },
      }}
    >
      <Container sx={{ position: "relative", zIndex: 1 }}>
        <Grid
          container
          spacing={5}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={12}>
            <Typography
              variant="h4"
              sx={{
                textAlign: "center",
                fontFamily: "Arizonia",
                fontWeight: "bold",
                color: "#fff",
              }}
            >
              {doaRestu.split(" ").map((text, key) => (
                <TextMask key={key} variants={textVariants}>
                  {text}
                </TextMask>
              ))}
            </Typography>
          </Grid>

          <Grid item xs={12} mb={5}>
            <Divider
              sx={{ my: 5, borderColor: "#fff" }}
              component={motion.div}
              variants={dividerVariants}
            >
              <FavoriteTwoToneIcon sx={{ fontSize: 50, color: "#fff" }} />
            </Divider>

            <Typography
              variant="h2"
              sx={{
                textAlign: "center",
                fontFamily: "Arizonia",
                fontWeight: "bold",
                color: "#fff",
              }}
            >
              {berbahagia.split(" ").map((text, key) => (
                <TextMask key={key} variants={textVariants}>
                  {text}
                </TextMask>
              ))}
            </Typography>
          </Grid>

          {/* Mempelai pria */}
          <Grid item md={6} xs={12}>
            <KeluargaBesar
              title="Mempelai Pria"
              orangTuaPria={pria.orangTua.pria}
              orangTuaWanita={pria.orangTua.wanita}
            />
          </Grid>

          {/* Mempelai wanita */}
          <Grid item md={6} xs={12} sx={{ mt: { md: 0, xs: 5 } }}>
            <KeluargaBesar
              title="Mempelai Wanita"
              orangTuaPria={wanita.orangTua.pria}
              orangTuaWanita={wanita.orangTua.wanita}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
