import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ContainerStarter from "../components/Organisms/ContainerStarter.jsx";
import DetailHeader from "../components/Molecules/DetailHeader.jsx";
import DetailInfo from "../components/Molecules/DetailInfo.jsx";
import MaterialHistory from "../components/Molecules/Materials/MaterialHistory.jsx";
import ApiService from "../services/ApiService.jsx";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import CircularProgress from "@mui/material/CircularProgress";
import { Button } from "primereact/button";
import { MdTipsAndUpdates } from "react-icons/md";
import FormInput from "../components/Molecules/Materials/FormInput.jsx";
import { fetchMaterials } from "@/stores/actions/materialActions.js";
import { fetchProduct } from "@/stores/actions/productAction.js";
import { useDispatch } from "react-redux";

const MaterialDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [material, setMaterial] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(10);
  const [showFormInputs, setShowFormInputs] = useState(false);
  const [formData, setFormData] = useState({
    information: "", // Menambahkan state untuk form data
  });
  const dispatch = useDispatch();

  useEffect(() => {
    fetchMaterial(); // Panggil fetchMaterial saat komponen pertama kali dimuat
  }, [id, page, rows]);

  const fetchMaterial = async () => {
    try {
      const response = await ApiService.getMaterial(id, page, rows);
      setMaterial(response.material);
      setHistory(response.history);
      setPagination(response.pagination);
      // Mengatur nilai awal untuk form data
      setFormData({
        information: response.material?.information || "", // Menyimpan informasi awal jika ada
      });
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (event) => {
    setPage(event.page + 1);
    setRows(event.rows);
  };

  const handleUpdate = async () => {
    setShowFormInputs(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await ApiService.updateMaterial(id, formData);
      if (response.success) {
        setShowFormInputs(false);
        fetchMaterial(); // Panggil kembali fetchMaterial setelah berhasil update
      } else {
        console.error("Failed to update material:", response.error);
        // Handle failure scenario
      }
    } catch (error) {
      console.error("Error updating material:", error);
      // Handle network or other errors
    }
  };

  const contentFish = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="card flex flex-row justify-between">
        {material?.information && (
          <h5 className="card-title" style={{ color: "#fff" }}>
            {material?.information}
          </h5>
        )}
        {!material?.information && (
          <p className="card-text" style={{ color: "#fff" }}>
            Informasi lebih lanjut tidak tersedia.
          </p>
        )}
        <Button
          label="update"
          className="ml-5 bg-none border border-martinique-400 text-martinique-200 p-1 text-base gap-2"
          icon={<MdTipsAndUpdates className="text-martinique-400 text-2xl" />}
          onClick={handleUpdate}
          outlined={true}
        ></Button>
      </div>
    </motion.div>
  );

  const contentCat = () => (
    <motion.div
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <Card sx={{ maxWidth: 345, bgcolor: "primary.main" }}>
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            color="primary.contrastText"
          >
            {material?.total_quantity} {material?.unit}
          </Typography>
          <Typography variant="body2" color="primary.contrastText">
            Jumlah Material
          </Typography>
        </CardContent>
      </Card>
    </motion.div>
  );

  const content = () => {
    if (loading) {
      return (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      );
    }

    if (error) {
      return (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Typography>Error: {error.message}</Typography>
        </Box>
      );
    }

    return (
      <div className="flex flex-col gap-8 justify-center w-full">
        <DetailHeader
          pageName={"Material Detail"}
          material={material}
          onBack={() => navigate(-1)}
          id={material?.model}
          setting={"material"}
        />
        <hr className="border-martinique-400 -mt-4 border" />
        <DetailInfo
          info={material}
          infoWaste={"Info Material"}
          pageName={"Material Detail"}
          infoReady={"Material Siap"}
          contentFish={contentFish()}
          contentCat={contentCat()}
        />
        <MaterialHistory
          material={material}
          history={history}
          pagination={pagination}
          onPageChange={handlePageChange}
          rowsPerPageOptions={[10, 20, 30, 50, 100]}
        />
        {showFormInputs && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white rounded-lg p-8"
            >
              <h2 className="text-lg font-bold mb-4">Update Material</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="information"
                    className="block text-sm font-medium text-martinique-600"
                  >
                    Information
                  </label>
                  <input
                    type="text"
                    id="information"
                    name="information"
                    value={formData.information}
                    onChange={handleChange}
                    className="w-full p-2 rounded-md border-martinique-600 border-2"
                  />
                </div>
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    className="bg-martinique-600 text-white rounded-md px-6 py-3 hover:bg-martinique-700 transition duration-300 ease-in-out"
                  >
                    Update
                  </Button>
                  <Button
                    type="button"
                    className="ml-2 bg-martinique-600 text-white rounded-md px-6 py-3 hover:bg-martinique-700 transition duration-300 ease-in-out"
                    onClick={() => setShowFormInputs(false)}
                  >
                    Close
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      <ContainerStarter Content={content()} />
    </div>
  );
};

export default MaterialDetail;
