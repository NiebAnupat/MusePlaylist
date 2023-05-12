import React from "react";
import AppBar from "./Appbar";
import { DataGrid } from "@mui/x-data-grid";
import { Box, TextField, Button, Modal, Typography } from "@mui/material";
import useAxios from "./useAxios";

export default function Home() {
  const [list, setList] = React.useState([]);

  React.useEffect(() => {
    fetchList();
  }, []);

  const fetchList = async () => {
    try {
      const res = await useAxios.get("/music");
      setList(res.data.reverse());
    } catch (e) {
      alert(e.message);
    }
  };

  const [id, setId] = React.useState("");
  const [theName, setTheName] = React.useState("");
  const [theArtist, setTheArtist] = React.useState("");
  const [theDescription, setTheDescription] = React.useState("");

  const [open, setOpen] = React.useState(false);
  const handleOpen = async (id) => {
    try {
      const res = await useAxios.get(`/music/${id}`);
      setId(res.data.id);
      setTheName(res.data.name);
      setTheArtist(res.data.artist);
      setTheDescription(res.data.description);
    } catch (e) {
      alert(e.message);
    }
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleUpdateMusic = async (id) => {
    try {
      const res = await useAxios.put(`/music/${id}`, {
        name: document.getElementById("name").value,
        artist: document.getElementById("artist").value,
        description: document.getElementById("description").value,
      });
      alert("แก้ไขเพลงเรียบร้อยแล้ว");
      handleClose();
    } catch (e) {
      alert(e.message);
    }
  };

  const handleDeleteMusic = async (id) => {
    try {
      const res = await useAxios.delete(`/music/${id}`);
      alert("ลบเพลงเรียบร้อยแล้ว");
      handleClose();
    } catch (e) {
      alert(e.message);
    }
  };

  // search
  const [search, setSearch] = React.useState("");

  const handleSearch = async () => {
    try {
      const res = await useAxios.get(`/music/search/${search}`);
      setList(res.data);
    } catch (e) {
      alert(e.message);
    }
  };

  const columns = [
    { field: "id", headerName: "ลำดับ", width: 80 },
    { field: "name", headerName: "ชื่อเพลง", width: 370 },
    { field: "artist", headerName: "ศิลปิน", width: 330 },
    { field: "description", headerName: "รายละเอียด", width: 385 },
  ];

  return (
    <>
      <AppBar />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100vh",
          backgroundImage:
            "url(https://img.freepik.com/free-photo/headphones-disk_23-2147670592.jpg?w=1060&t=st=1683804511~exp=1683805111~hmac=f73e8c41431ee7f955a89000fbad2cd0b848f68d27de97f940777c1c4b8bd5e2)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Box
          sx={{
            marginTop: 3,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            width: "80%",
            height: "fit-content",
          }}
        >
          <TextField
            label="ค้นหาเพลง"
            variant="outlined"
            sx={{
              width: "90%",
              backdropFilter: "blur(10px)",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
            }}
            onChange={(e) => {
              setSearch(e.target.value);
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
            onClick={handleSearch}
          >
            ค้นหา
          </Button>
        </Box>

        {/* ตาราง */}
        <DataGrid
          sx={{
            marginTop: 5,
            marginBottom: 5,
            width: "78%",
            borderRadius: "10px",
            backdropFilter: "blur(8px)",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
          }}
          rows={list}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          onRowClick={(e) => {
            handleOpen(e.row.id);
          }}
          pageSizeOptions={[8]}
        />
      </Box>

      {/* ป็อบอัพ */}
      <Modal open={open} onClose={handleClose}>
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
            height: 450,
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
              defaultValue={theName}
            />
            <TextField
              id="artist"
              label="ศิลปิน"
              variant="outlined"
              defaultValue={theArtist}
            />
            <TextField
              id="description"
              label="รายละเอียด"
              multiline
              rows={4}
              defaultValue={theDescription}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
            }}
          >
            <Button
              sx={{ color: "red" }}
              // delete with id
              onClick={() => {
                handleDeleteMusic(id);
              }}
            >
              ลบเพลง
            </Button>
            <Button
              onClick={() => {
                handleUpdateMusic(id);
              }}
            >
              แก้ไข
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
