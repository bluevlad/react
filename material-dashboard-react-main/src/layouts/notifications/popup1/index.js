/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";
import PropTypes from "prop-types";

// @mui material components
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Import Popup2 for chaining
import Popup2 from "../popup2";

function Popup1({ open, onClose, children, ...rest }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [popup2Open, setPopup2Open] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => {
    setModalOpen(false);
    if (onClose) onClose();
  };

  const handlePopup2Open = () => {
    setModalOpen(false); // 팝업1 닫기
    setPopup2Open(true); // 팝업2 열기
  };

  const handlePopup2Close = () => {
    setPopup2Open(false);
  };

  return (
    <>
      <MDButton variant="gradient" color="primary" onClick={openModal} {...rest}>
        {children}
      </MDButton>

      {/* Modal Popup */}
      <Dialog
        open={modalOpen}
        onClose={closeModal}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: 3,
          },
        }}
      >
        <DialogTitle>
          <MDBox display="flex" justifyContent="space-between" alignItems="center">
            <MDTypography variant="h6" fontWeight="medium">
              모달 팝업
            </MDTypography>
            <IconButton
              aria-label="close"
              onClick={closeModal}
              sx={{
                color: (theme) => theme.palette.grey[500],
              }}
            >
              ✕
            </IconButton>
          </MDBox>
        </DialogTitle>

        <DialogContent>
          <MDBox py={2}>
            <MDTypography variant="body1" color="text" mb={2}>
              이것은 첫 번째 팝업입니다.
            </MDTypography>
            <MDTypography variant="body2" color="text" mb={2}>
              아래 &quot;팝업2 열기&quot; 버튼을 클릭하면 이 팝업이 닫히고 두 번째 팝업이 열립니다.
            </MDTypography>
            <MDBox
              p={2}
              sx={{
                backgroundColor: "info.light",
                borderRadius: 1,
                border: "1px solid",
                borderColor: "info.main",
              }}
            >
              <MDTypography variant="body2" color="info.dark">
                🔗 팝업 연동: 팝업2 열기 버튼을 클릭해보세요!
              </MDTypography>
            </MDBox>
          </MDBox>
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <MDButton variant="outlined" color="secondary" onClick={closeModal} sx={{ mr: 1 }}>
            취소
          </MDButton>
          <MDButton variant="gradient" color="success" onClick={handlePopup2Open}>
            팝업2 열기
          </MDButton>
        </DialogActions>
      </Dialog>

      {/* Popup2 - 팝업1에서 제어 */}
      <Popup2 open={popup2Open} onClose={handlePopup2Close}>
        <span>Hidden</span>
      </Popup2>
    </>
  );
}

// Setting default values for the props of Popup1
Popup1.defaultProps = {
  open: false,
  onClose: () => {},
  children: null,
};

// Typechecking props for the Popup1
Popup1.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node,
};

export default Popup1;
