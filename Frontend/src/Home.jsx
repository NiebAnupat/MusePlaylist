import React from "react";
import AppBar from "./Appbar";
import { DataGrid } from "@mui/x-data-grid";
import { Box, TextField, Button, Modal, Typography } from "@mui/material";

export default function Home() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const list = [];
  const columns = [
    { field: "id", headerName: "ลำดับ", width: 80 },
    { field: "date", headerName: "ชื่อเพลง", width: 385 },
    { field: "time_in", headerName: "ศิลปิน", width: 350 },
    { field: "time_out", headerName: "รายละเอียด", width: 350 },
  ];

  const row = [{ id: 1, date: "Frozen yoghurt", time_in: 159, time_out: 6.0 }];

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
            id="outlined-basic"
            label="ค้นหาเพลง"
            variant="outlined"
            sx={{
              width: "90%",
              backdropFilter: "blur(2px)",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
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
            backdropFilter: "blur(2px)",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
          }}
          rows={row}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 8,
              },
            },
          }}
          onRowClick={(e) => {
            handleOpen();
          }}
          pageSizeOptions={[8]}
        />
      </Box>

      {/* ป็อบอัพ */}
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
            <TextField id="name" label="ชื่อเพลง" variant="outlined" />
            <TextField id="artist" label="ศิลปิน" variant="outlined" />
            <TextField id="description" label="รายละเอียด" multiline rows={4} />
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
            }}
          >
            <Button sx={{ color: "red" }}>ลบเพลง</Button>
            <Button>แก้ไข</Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
