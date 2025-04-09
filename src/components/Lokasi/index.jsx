import useDB from "@/hooks/useDB";
import { Box, Container } from "@mui/material";

/**
 * Komponen Lokasi dengan Background Batik
 * @returns React.ReactElement
 */
const Lokasi = () => {
  const { gmaps } = useDB((db) => db.wedding.resepsi);

  return (
    <Box
      sx={{
        py: 15,
        backgroundColor: "text.secondary",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrnETGTXiPDqcmvFCuFIy82xU7xFiU7DK4iHQgt0ecwQ7SxkB2DvyJ90Snw1fAGSj0GrM&usqp=CAU')`,

        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Container
        sx={{
          p: 2,
          backgroundColor: "rgba(255, 255, 255, 0.8)", // Transparan sedikit biar batiknya tetap kelihatan
          borderRadius: 3,
          boxShadow: "0 8px 16px rgba(0,0,0,0.2)", // Tambah efek bayangan biar lebih elegan
        }}
      >
        <Box
          component="iframe"
          title="Google Maps"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src={gmaps.iframeSrc}
          sx={{
            width: "100%",
            height: 450,
            border: 0,
            borderRadius: 2,
          }}
        />
      </Container>
    </Box>
  );
};

export default Lokasi;
