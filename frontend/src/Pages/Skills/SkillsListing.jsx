import React, { useState, useEffect } from 'react';
import { Container, Typography, Toolbar, Link, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import StarsIcon from '@mui/icons-material/Stars';
import { DeleteMultipleSkillById, DeleteSkillById, GetAllSkill } from '../../Services/SkillService';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import DeleteModal from '../../Components/Common/DeleteModal';

function SkillsListing() {
    const navigate = useNavigate();
    const [skills, setSkills] = useState([]);
    const [open, setOpen] = useState(false);
    const [multipleOpen, setMultipleOpen] = useState(false);
    const [selectedSkill, setSelectedSkill] = useState(null);
    const [selectedSkillList, setSelectedSkillList] = useState([]);

    const loadSkills = () => {
        try {
            GetAllSkill()
                .then((res) => {
                    setSkills(res.data);
                })
                .catch((err) => {
                    toast.error('Internal server error occurred');
                })
        } catch (error) {
            console.error('Error fetching skills:', error);
        }
    };

    const handleOpen = (item) => {
        setSelectedSkill(item);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleMultipleClose = () => {
        setMultipleOpen(false);
    };

    const handleDelete = async () => {
        DeleteSkillById(selectedSkill.id)
            .then((res) => {
                if (res.status === 200) {
                    toast.success(`Deletion "${res.data.title}" successful`);
                    loadSkills();
                }
            })
            .catch((err) => {
                toast.error(err)
            });
        handleClose();
    };

    const handleDeleteMultiple = async () => {
        DeleteMultipleSkillById(selectedSkillList)
            .then((res) => {
                if (res.status === 200) {
                    toast.success(`Deletion of selected skills successful`);
                    loadSkills();
                }
            })
            .catch((err) => {
                toast.error(err)
            });
        handleMultipleClose();
    };

    const handleDeleteMultipleConfirmation = () => {
        if (selectedSkillList.length === 0) {
            toast.warning("No Skills Selected To Delete");
            return;
        }
        setMultipleOpen(true);
    }

    useEffect(() => {
        loadSkills();
    }, []);

    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'title', headerName: 'Title', flex: 1 },
        { field: 'description', headerName: 'Description', flex: 2 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 200,
            renderCell: (params) => (
                <Toolbar>
                    <Link component={RouterLink} to={`/skills/edit/${params.row.id}`} color="primary" underline="none" sx={{ mr: 3 }}>
                        <EditIcon />
                    </Link>
                    <Link component="button" color="error" underline="none" onClick={() => handleOpen(params.row)}>
                        <DeleteIcon />
                    </Link>
                </Toolbar>
            ),
        },
    ];

    return (
        <Container maxWidth="lg" sx={{ marginTop: 4 }}>
            <Typography variant="h3" align="center" gutterBottom>
                <StarsIcon color="primary" sx={{ fontSize: 40, marginRight: 1 }} />
                Skills Listing
            </Typography>
            <Button
                variant="contained"
                onClick={() => navigate("/skills/create")}
                sx={{ mb: 3 }}
            >
                Create
            </Button>
            <Button
                variant="contained"
                color="error"
                onClick={handleDeleteMultipleConfirmation}
                sx={{ mb: 3, ml: 2 }}
            >
                Delete
            </Button>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={skills}
                    columns={columns}
                    pageSize={5}
                    checkboxSelection
                    disableSelectionOnClick
                    onRowSelectionModelChange={(newRowSelectionModel) => {
                        setSelectedSkillList(newRowSelectionModel);
                    }}
                />
            </div>
            <DeleteModal
                open={open}
                handleClose={handleClose}
                handleDelete={handleDelete}
                selectedItem={selectedSkill}
            />
            <DeleteModal
                open={multipleOpen}
                handleClose={handleMultipleClose}
                handleDelete={handleDeleteMultiple}
                selectedItemList={selectedSkillList}
            />
        </Container>
    );
}

export default SkillsListing;
