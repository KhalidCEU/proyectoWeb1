import React, { useEffect, useState } from 'react';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';
import { Product } from '@/app/types/Product';
import { useAdminImagesService } from '@/services/admin/images';

const CreateProductModal = ({ open, handleClose, handleCreate, handleUpdate, productData } : any) => {
  const [formData, setFormData] = useState<Product>({
    _id: productData?._id || '',
    name: productData?.name || '',
    description: productData?.description || '',
    ratings: productData?.ratings || [],
    averageRating: productData?.averageRating || 0,
    imageUrl: productData?.imageUrl || '',
    isFavorite: productData?.isFavorite || false,
    estimatedPrice: {
        minPrice: productData?.estimatedPrice?.minPrice || 1,
        maxPrice: productData?.estimatedPrice?.maxPrice || 2,
    },
    comments: productData?.comments || []
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const imagesService = useAdminImagesService();

  useEffect(() => {
    if (open && productData) {
      setFormData(productData);
    }
  }, [open, productData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData(prevData => {
      if (name === 'minPrice' || name === 'maxPrice') {
          return {
            ...prevData,
            estimatedPrice: {
                ...prevData.estimatedPrice,
                [name]: Number(value)
            }
          };
      } else {
          return {
            ...prevData,
            [name]: value
          };
      }
    });
  };

  const handleFileChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  let updatedImageUrl = formData.imageUrl;

  const handleSubmit = async (e: any) => {
    e.preventDefault(); // Avoid refreshing the page (form's default behaviour)

    if (selectedFile) {
      try {
        const response = await imagesService.uploadProductImage(formData._id || '', selectedFile);
        updatedImageUrl = response.imageUrl;
      } catch (error) {
        console.error('Error uploading image: ', error);
        return;
      }
    }

    const updatedData = {
      ...formData,
      imageUrl: updatedImageUrl
    }

    if (formData._id) {
      handleUpdate(formData._id, updatedData); // Call update function with form data
    } else {
      handleCreate(updatedData); // Call create function
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
    <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 bg-white shadow-lg p-4 rounded-md">
    <Typography variant="h6" component="h2" gutterBottom>

        {formData._id ? 'Update' : 'Create'} Product

        <input
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          id="file_input"
          type="file"
          onChange={handleFileChange}
          accept="image/*"
          style={{ display: 'none' }}
        />

        <label htmlFor="file_input" >
            <Button
              component="span"
              className="block mt-5 px-10 py-2 text-sm font-bold text-white text-center bg-gray-800 hover:bg-gray-700 rounded-md ">
              {selectedFile ? selectedFile.name : 'Upload Image'}
            </Button>
          </label>

        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            name="name"
            label="Product Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            name="description"
            label="Description"
            value={formData.description}
            onChange={handleChange}
            multiline
            rows={3}
          />
          <TextField
            fullWidth
            margin="normal"
            name="minPrice"
            label="Min. Price"
            type="number"
            value={formData.estimatedPrice.minPrice.toString()}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            name="maxPrice"
            label="Max. Price"
            type="number"
            value={formData.estimatedPrice.maxPrice.toString()}
            onChange={handleChange}
            required
          />
          {/* <TextField
            fullWidth
            margin="normal"
            name="imageUrl"
            label="Image URL"
            value={formData.imageUrl}
            onChange={handleChange}
          /> */}

          <div className="mt-4 flex justify-center">
            <Button
                onClick={handleClose}
                sx={{ mr: 1 }}
                className="mr-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300
                    rounded-md hover:bg-gray-50"
            >
                Cancel
            </Button>
            <Button
                type='submit'
                sx={{ mr: 1 }}
                className="px-4 py-2 text-sm font-bold text-white bg-black rounded-md hover:bg-gray-800"
            >
                {formData._id ? 'Update' : 'Create'}
            </Button>
          </div>

        </form>
      </Box>
    </Modal>
  );
};

export default CreateProductModal;