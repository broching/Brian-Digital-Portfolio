import React, { useState, useEffect } from 'react';
import { Container, Typography, Toolbar, Link, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import WorkIcon from '@mui/icons-material/Work';
import { GetAllExperience, DeleteMultipleExperience, DeleteExperience } from '../../Services/ExperienceService';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import DeleteModal from '../../Components/Common/DeleteModal';

function ProjectListing() {
    const navigate = useNavigate();
    const [experiences, setExperiences] = useState([]);
    const [open, setOpen] = useState(false);
    const [multipleOpen, setMultipleOpen] = useState(false);
    const [selectedExperience, setSelectedExperience] = useState(null);
    const [selectedExperienceList, setSelectedExperienceList] = useState([]);

    const loadExperiences = () => {
        try {
            GetAllExperience()
                .then((res) => {
                    setExperiences(res.data);
                })
                .catch((err) => {
                    toast.error('Internal server error occurred');
                })
        } catch (error) {
            console.error('Error fetching experiences:', error);
        }
    };

    const handleOpen = (item) => {
        setSelectedExperience(item);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleMultipleClose = () => {
        setMultipleOpen(false);
    };

    const handleDelete = async () => {
        DeleteExperience(selectedExperience.id)
            .then((res) => {
                if (res.status === 200) {
                    toast.success(`Deletion "${res.data.title}" successful`);
                    loadExperiences();
                }
            })
            .catch((err) => {
                toast.error(err)
            });
        handleClose();
    };

    const handleDeleteMultiple = async () => {
        DeleteMultipleExperience(selectedExperienceList)
            .then((res) => {
                if (res.status === 200) {
                    toast.success(`Deletion of selected experiences successful`);
                    loadExperiences();
                }
            })
            .catch((err) => {
                toast.error(err)
            });
        handleMultipleClose();
    };

    const handleDeleteMultipleConfirmation = () => {
        if (selectedExperienceList.length === 0) {
            toast.warning("No Experiences Selected To Delete");
            return;
        }
        setMultipleOpen(true);
    }

    useEffect(() => {
        loadExperiences();
    }, []);

    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'title', headerName: 'Title', flex: 1 },
        { field: 'category', headerName: 'Category', flex: 1 },
        { field: 'description', headerName: 'Description', flex: 2 },
        { field: 'dateStart', headerName: 'Start Date', width: 150 },
        { field: 'dateEnd', headerName: 'End Date', width: 150 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 200,
            renderCell: (params) => (
                <Toolbar>
                    <Link component={RouterLink} to={`/experience/edit/${params.row.id}`} color="primary" underline="none" sx={{ mr: 3 }}>
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
                <WorkIcon color="primary" sx={{ fontSize: 40, marginRight: 1 }} />
                Project Listing
            </Typography>
            <Button
                variant="contained"
                onClick={() => navigate("/experience/create")}
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
                    rows={experiences}
                    columns={columns}
                    pageSize={5}
                    checkboxSelection
                    disableSelectionOnClick
                    onRowSelectionModelChange={(newRowSelectionModel) => {
                        setSelectedExperienceList(newRowSelectionModel);
                    }}
                />
            </div>
            <DeleteModal
                open={open}
                handleClose={handleClose}
                handleDelete={handleDelete}
                selectedItem={selectedExperience}
            />
            <DeleteModal
                open={multipleOpen}
                handleClose={handleMultipleClose}
                handleDelete={handleDeleteMultiple}
                selectedItemList={selectedExperienceList}
            />
        </Container>
    );
}

export default ProjectListing;
