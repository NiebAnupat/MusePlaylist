import React from "react";
import {
  Container,
  Typography,
  Toolbar,
  AppBar,
  Button,
  Box,
  Modal,
  TextField,
} from "@mui/material";
import useAxios from "./useAxios";

export default function ResponsiveAppBar() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [name, setName] = React.useState("");
  const [artist, setArtist] = React.useState("");
  const [description, setDescription] = React.useState("");

  const handleAddMusic = async () => {
    try {
      const res = await useAxios.post("/music", {
        name,
        artist,
        description,
      });
      alert("เพิ่มเพลงเรียบร้อยแล้ว");
      handleClose();
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          boxShadow: "none",
          backgroundColor: "#C689C6",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar>
              <img
                width={50}
                src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/ab52da00-71c2-4ae2-bc2a-3b28214b02c9/df5ivtx-eadd298a-d7bd-474b-8a5c-ac25ae236089.png/v1/fill/w_1280,h_1280/music_band_logo_design__song_logo_design_png__by_rahatislam11_df5ivtx-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiJcL2ZcL2FiNTJkYTAwLTcxYzItNGFlMi1iYzJhLTNiMjgyMTRiMDJjOVwvZGY1aXZ0eC1lYWRkMjk4YS1kN2JkLTQ3NGItOGE1Yy1hYzI1YWUyMzYwODkucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.stwNmQZaDjjAVXsG4piJptiaoHLXKAsIMa3SAWCoV_c"
              />

            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "noto-sans",
                fontWeight: 600,
                letterSpacing: ".1rem",
              }}
            >
              Muse Playlist
            </Typography>

            <Box
              sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
            ></Box>

            <Button variant="text" sx={{ color: "white" }} onClick={handleOpen}>
              เพิ่มเพลง
            </Button>
          </Toolbar>
        </Container>
      </AppBar>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            marginTop: "20px",
            display: "flex",
            flexDirection: "column",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 450,
            height: 500,
            bgcolor: "background.paper",
            boxShadow: 24,
            borderRadius: "10px",
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2">
            เพิ่มเพลงเข้าสู่รายการ
          </Typography>

          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
            }}
          >
            <TextField
              id="name"
              label="ชื่อเพลง"
              variant="outlined"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <TextField
              id="artist"
              label="ศิลปิน"
              variant="outlined"
              onChange={(e) => {
                setArtist(e.target.value);
              }}
            />
            <TextField
              id="description"
              label="รายละเอียด"
              multiline
              rows={4}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#C689C6",
                "&:hover": {
                  backgroundColor: "#937DC2",
                  color: "black",
                },
              }}
              onClick={handleAddMusic}
            >
              ยืนยัน
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
