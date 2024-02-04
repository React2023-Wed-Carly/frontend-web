// CarDetailsPage.jsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import 'bulma/css/bulma.min.css';
import './CarDetailsPage.css'; // Import the CSS file
import {bigintToFloat} from "../utils";

const CarDetailsPage = ({ onUpdateCar, onDeleteCar }) => {
	const cars = useSelector((state) => state.carsData);
	const jwtToken = useSelector((state) => state.jwttoken);
	const { carId } = useParams();
	const carAll = cars.find((car) => car.info.id === parseInt(carId));
	const imageString = carAll.img;
	const car = carAll.info;
	const [newFeature, setNewFeature] = useState('');
	const [isEditing, setEditing] = useState(false);

	const handleEdit = () => {
		setEditing(true);
	};

	const handleSave = () => {
		// todo
		setEditing(false);
	};

	const handleDelete = () => {
		// todo
	};

	// todo
	const addFeature = () => {
		if (newFeature.trim() !== '') {
			const updatedFeatures = [...car.features, newFeature];
			onUpdateCar(car.id, { features: updatedFeatures });
			setNewFeature('');
		}
	};

	// todo
	const deleteFeature = (index) => {
		const updatedFeatures = [...car.features];
		updatedFeatures.splice(index, 1);
		onUpdateCar(car.id, { features: updatedFeatures });
	};

	if (!car) {
		return <div>Car not found</div>;
	}

	return (
		<div className="rows">
			<h2 className="title is-4">Details of car {car.id}</h2>

			<div className="field">
				<label className="label">Owner ID:</label>
				<div className="control">
					{isEditing ? (
						<input
							className="input"
							type="text"
							value={car.ownerId}
							onChange={(e) => onUpdateCar(car.id, { ownerId: e.target.value })}
						/>
					) : (
						<span>{car.ownerId}</span>
					)}
				</div>
			</div>

			<div className="field">
				<label className="label">Photo:</label>
				<div className="control">
					{isEditing ? (
						<input
							className="input"
							type="text"
							value={car.photo}
							onChange={(e) => onUpdateCar(car.id, { photo: e.target.value })}
						/>
					) : (
						<span>
							<img src={`data:image/jpeg;base64,${imageString}`} alt={car.model}
							style={{height: 360}}/>
						</span>
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
							value={car.brand}
							onChange={(e) => onUpdateCar(car.id, { brand: e.target.value })}
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
							value={car.model}
							onChange={(e) => onUpdateCar(car.id, { model: e.target.value })}
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
							value={car.year}
							onChange={(e) =>
								onUpdateCar(car.id, { year: parseInt(e.target.value, 10) })
							}
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
							value={car.description}
							onChange={(e) =>
								onUpdateCar(car.id, { description: e.target.value })
							}
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
							value={car.dailyPrice}
							onChange={(e) =>
								onUpdateCar(car.id, { dailyPrice: parseFloat(e.target.value) })
							}
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
								value={car.latitude}
								onChange={(e) =>
									onUpdateCar(car.id, {
										location: {
											...car.location,
											latitude: parseFloat(e.target.value),
										},
									})
								}
							/>
							<label>Longitude:</label>
							<input
								className="input"
								type="number"
								value={car.latitude}
								onChange={(e) =>
									onUpdateCar(car.id, {
										location: {
											...car.location,
											longitude: parseFloat(e.target.value),
										},
									})
								}
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
							value={car.fuelType}
							onChange={(e) =>
								onUpdateCar(car.id, { fuelType: e.target.value })
							}
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
							value={car.transmission}
							onChange={(e) =>
								onUpdateCar(car.id, { transmission: e.target.value })
							}
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
							value={car.seatingCapacity}
							onChange={(e) =>
								onUpdateCar(car.id, {
									seatingCapacity: parseInt(e.target.value, 10),
								})
							}
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
							value={car.mileage}
							onChange={(e) =>
								onUpdateCar(car.id, { mileage: parseInt(e.target.value, 10) })
							}
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
							{car.features.map((feature, index) => (
								<div key={index} className="feature-edit">
									<input
										className="input"
										type="text"
										value={feature}
										onChange={(e) => {
											const updatedFeatures = [...car.features];
											updatedFeatures[index] = e.target.value;
											onUpdateCar(car.id, { features: updatedFeatures });
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
						<span>{car.features}</span>
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
							value={car.licensePlateNumber}
							onChange={(e) =>
								onUpdateCar(car.id, { licensePlateNumber: e.target.value })
							}
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
