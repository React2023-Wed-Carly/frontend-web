// CarDetailsPage.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import 'bulma/css/bulma.min.css';
import './CarDetailsPage.css'; // Import the CSS file
import {bigintToFloat} from "../utils";
import { requestDeleteCar } from '../redux/thunks';

const CarDetailsPage = ({ onUpdateCar, onDeleteCar }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const cars = useSelector((state) => state.carsData);
	const jwtToken = useSelector((state) => state.jwttoken);
	const { carId } = useParams();
	const carAll = cars.find((car) => car.info.id === parseInt(carId));
	const imageString = carAll.img;
	const car = carAll.info;
	const features = car.features.split(',');
	const [newFeature, setNewFeature] = useState('');
	const [isEditing, setEditing] = useState(false);
	const [uploadedImage, setUploadedImage] = useState(null);

	const [editedCar, setEditedCar] = useState({
		brand: car.brand,
		model: car.model,
		mileage: car.mileage,
		year: car.year,
		ownerId: car.ownerId,
		dailyPrice: car.dailyPrice,
		description: car.description,
		latitude: car.latitude,
		longitude: car.longitude,
		seatingCapacity: car.seatingCapacity,
		fuelType: car.fuelType,
		transmission: car.transmission,
		licensePlateNumber: car.licensePlateNumber,
		features: car.features.split(','),
	  });
	
	  const assembleJSON = () => {
		const jsonToSave = {
		  brand: editedCar.brand,
		  model: editedCar.model,
		  mileage: editedCar.mileage,
		  year: editedCar.year,
		  ownerId: editedCar.ownerId,
		  dailyPrice: editedCar.dailyPrice,
		  description: editedCar.description,
		  latitude: editedCar.latitude,
		  longitude: editedCar.longitude,
		  seatingCapacity: editedCar.seatingCapacity,
		  fuelType: editedCar.fuelType,
		  transmission: editedCar.transmission,
		  licensePlateNumber: editedCar.licensePlateNumber,
		  features: editedCar.features.join(','),
		};
	
		// You can now use 'jsonToSave' as needed (e.g., send it to the server)
		console.log('Assembled JSON:', jsonToSave);
	  };

	  const handleInputChange = (e) => {
		const { name, value } = e.target;
	
		// Update the state using setEditedCar
		setEditedCar((prevCar) => ({
		  ...prevCar,
		  [name]: value,
		}));
	  };

	const handleEdit = () => {
		setEditing(true);
	};

	const handleSave = () => {
		// todo
		if (uploadedImage) {
			const reader = new FileReader();
			reader.onloadend = () => {
			  const base64Image = reader.result.split(',')[1];
			  console.log('Uploaded Image in base64:', base64Image);
			  // TODO: Save the base64Image or use it as needed
			};
			reader.readAsDataURL(uploadedImage);
		  }
		assembleJSON();
		setEditing(false);
	};

	const handleDelete = () => {
		try{
			const response = dispatch(requestDeleteCar(jwtToken, carId));
			if (response.status === 200)
			{
			console.log(`${response}`)
				navigate('/main');
			}
	  } catch (error) {
		console.error('Car deletion failed:', error);
	  }
	};

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		setUploadedImage(file);
	  };

	// todo
	const addFeature = () => {
		if (newFeature.trim() !== '') {
			const updatedFeatures = [...editedCar.features, newFeature];
			setEditedCar((prevCar) => ({
				...prevCar,
				features: updatedFeatures}));
			setNewFeature('');
		}
	};

	// todo
	const deleteFeature = (index) => {
		const updatedFeatures = [...editedCar.features];
		updatedFeatures.splice(index, 1);
		console.log(updatedFeatures);
		setEditedCar((prevCar) => ({
			...prevCar,
			features: updatedFeatures,
	}));
	}
	if (!car) {
		return <div>Car not found</div>;
	}

	return (
		<div className="rows">
			<h2 className="title is-4">Details of car {car.id}</h2>
			<div className="field">
				<label className="label">Photo:</label>
				<div className="control">
					{isEditing ? (
						<div class="file has-name">
						<label class="file-label">
							<input class="file-input" type="file" name="resume" onChange={handleFileChange}/>
							<span class="file-cta">
							<span class="file-icon">
								<i class="fas fa-upload"></i>
							</span>
							<span class="file-label">
								Choose a file…
							</span>
							</span>
							<span class="file-name">
							{uploadedImage ? uploadedImage.name : ""}
							</span>
						</label>
						</div>
					) : (
						<span>
							<img src={`data:image/jpeg;base64,${imageString}`} alt={car.model}
							style={{height: 360}}/>
						</span>
					)}
				</div>
			</div>

			<div className="field">
				<label className="label">Owner ID:</label>
				<div className="control">
					{isEditing ? (
						<input
							className="input"
							type="text"
							name="ownerId"
							value={editedCar.ownerId}
							onChange={handleInputChange}
						/>
					) : (
						<span>{car.ownerId}</span>
					)}
				</div>
			</div>

			<div className="field">
				<label className="label">Brand:</label>
				<div className="control">
					{isEditing ? (
						<input
							className="input"
							type="text"
							name="brand"
							value={editedCar.brand}
							onChange={handleInputChange}
						/>
					) : (
						<span>{car.brand}</span>
					)}
				</div>
			</div>

			<div className="field">
				<label className="label">Model:</label>
				<div className="control">
					{isEditing ? (
						<input
							className="input"
							type="text"
							name="model"
							value={editedCar.model}
							onChange={handleInputChange}
						/>
					) : (
						<span>{car.model}</span>
					)}
				</div>
			</div>

			<div className="field">
				<label className="label">Year:</label>
				<div className="control">
					{isEditing ? (
						<input
							className="input"
							type="number"
							name="year"
							value={editedCar.year}
							onChange={handleInputChange}
						/>
					) : (
						<span>{car.year}</span>
					)}
				</div>
			</div>

			<div className="field">
				<label className="label">Description:</label>
				<div className="control">
					{isEditing ? (
						<textarea
							className="textarea"
							name="description"
							value={editedCar.description}
							onChange={handleInputChange}
						/>
					) : (
						<span>{car.description}</span>
					)}
				</div>
			</div>

			<div className="field">
				<label className="label">Daily Price:</label>
				<div className="control">
					{isEditing ? (
						<input
							className="input"
							type="number"
							name="dailyPrice"
							value={editedCar.dailyPrice}
							onChange={handleInputChange}
						/>
					) : (
						
						<span>${bigintToFloat(car.dailyPrice)}</span>
					)}
				</div>
			</div>

			<div className="field">
				<label className="label">Location:</label>
				<div className="control">
					{isEditing ? (
						<div>
							<label>Latitude:</label>
							<input
								className="input"
								type="number"
								name="latitude"
								value={editedCar.latitude}
								onChange={handleInputChange}
							/>
							<label>Longitude:</label>
							<input
								className="input"
								type="number"
								name="longitude"
								value={editedCar.longitude}
								onChange={handleInputChange}
							/>
						</div>
					) : (
						<span>
							Latitude: {car.latitude}, Longitude:{' '}
							{car.latitude}
						</span>
					)}
				</div>
			</div>

			<div className="field">
				<label className="label">Fuel Type:</label>
				<div className="control">
					{isEditing ? (
						<input
							className="input"
							type="text"
							name="fuelType"
							value={editedCar.fuelType}
							onChange={handleInputChange}
						/>
					) : (
						<span>{car.fuelType}</span>
					)}
				</div>
			</div>

			<div className="field">
				<label className="label">Transmission:</label>
				<div className="control">
					{isEditing ? (
						<input
							className="input"
							type="text"
							name="transmission"
							value={editedCar.transmission}
							onChange={handleInputChange}
						/>
					) : (
						<span>{car.transmission}</span>
					)}
				</div>
			</div>

			<div className="field">
				<label className="label">Seating Capacity:</label>
				<div className="control">
					{isEditing ? (
						<input
							className="input"
							type="number"
							name="seatingCapacity"
							value={editedCar.seatingCapacity}
							onChange={handleInputChange}
						/>
					) : (
						<span>{car.seatingCapacity}</span>
					)}
				</div>
			</div>

			<div className="field">
				<label className="label">Mileage:</label>
				<div className="control">
					{isEditing ? (
						<input
							className="input"
							type="number"
							name="mileage"
							value={editedCar.mileage}
							onChange={handleInputChange}
						/>
					) : (
						<span>{car.mileage} km</span>
					)}
				</div>
			</div>

			<div className="field">
				<label className="label">Features:</label>
				<div className="control">
					{isEditing ? (
						<div>
							{editedCar.features.map((feature, index) => (
								<div key={index} className="feature-edit">
									<input
										className="input"
										type="text"
										value={feature}
										onChange={(e) => {
											const updatedFeatures = [...editedCar.features];
											updatedFeatures[index] = e.target.value;
											setEditedCar((prevCar) => ({
												...prevCar,
												features: updatedFeatures,
											  }));
										}}
									/>
									<button
										className="button is-danger is-small"
										onClick={() => deleteFeature(index)}
									>
										Delete
									</button>
								</div>
							))}
							<div className="feature-edit">
								<input
									className="input"
									type="text"
									placeholder="New Feature"
									value={newFeature}
									onChange={(e) => setNewFeature(e.target.value)}
								/>
								<button
									className="button is-success is-small"
									onClick={addFeature}
								>
									Add
								</button>
							</div>
						</div>
					) : (
						<span>{features.join(', ')}</span>
					)}
				</div>
			</div>

			<div className="field">
				<label className="label">License Plate Number:</label>
				<div className="control">
					{isEditing ? (
						<input
							className="input"
							type="text"
							name="licensePlateNumber"
							value={editedCar.licensePlateNumber}
							onChange={handleInputChange}
						/>
					) : (
						<span>{car.licensePlateNumber}</span>
					)}
				</div>
			</div>

			<div className="field is-grouped">
				{isEditing ? (
					<>
						<div className="control">
							<button className="button is-success" onClick={handleSave}>
								Save
							</button>
						</div>
						<div className="control">
							<button className="button is-danger" onClick={handleDelete}>
								Delete
							</button>
						</div>
					</>
				) : (
					<div className="control">
						<button className="button is-info" onClick={handleEdit}>
							Edit
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default CarDetailsPage;
