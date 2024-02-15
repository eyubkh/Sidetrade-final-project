import { useState } from "react";

type Props = {
	status: {
		status: string;
		setStatus: React.Dispatch<React.SetStateAction<string>>;
	};
};

export function DropDown({ status }: Props) {
	const [toggle, setToggle] = useState(false);
	return (
		<div className="relative">
			<button
				id="dropdownRadioButton"
				data-dropdown-toggle="dropdownDefaultRadio"
				className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
				type="button"
				onClick={() => setToggle(!toggle)}
			>
				Select status
				<svg
					className="w-2.5 h-2.5 ms-3"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 10 6"
				>
					<path
						stroke="currentColor"
						strokeLinecap="round"
						strokeWidth="2"
						d="m1 1 4 4 4-4"
					/>
				</svg>
			</button>

			<div
				style={{ display: toggle ? "block" : "none" }}
				className="z-10 absolute top-12 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
			>
				<ul
					className="p-3 space-y-3 text-sm text-gray-700 dark:text-gray-200"
					aria-labelledby="dropdownRadioButton"
				>
					<li>
						<div className="flex items-center">
							<input
								readOnly
								checked={status.status === "All"}
								id="default-radio-1"
								type="radio"
								value=""
								name="default-radio"
								className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
							/>
							<label
								onClick={() => {
									status.setStatus("All");
									setToggle(false);
								}}
								htmlFor="default-radio-1"
								className="ms-2 text-sm font-medium cursor-pointer text-gray-900 dark:text-gray-300"
							>
								All
							</label>
						</div>
					</li>
					<li>
						<div className="flex items-center">
							<input
								readOnly
								checked={status.status === "Shipped"}
								id="default-radio-2"
								type="radio"
								value=""
								name="default-radio"
								className="w-4 h-4  text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
							/>
							<label
								onClick={() => {
									status.setStatus("Shipped");
									setToggle(false);
								}}
								htmlFor="default-radio-2"
								className="ms-2 text-sm cursor-pointer font-medium text-gray-900 dark:text-gray-300"
							>
								Shipped
							</label>
						</div>
					</li>
					<li>
						<div className="flex items-center">
							<input
								readOnly
								checked={status.status === "Unshipped"}
								id="default-radio-3"
								type="radio"
								value=""
								name="default-radio"
								className="w-4 h-4 cursor-pointer text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
							/>
							<label
								onClick={() => {
									status.setStatus("Unshipped");
									setToggle(false);
								}}
								htmlFor="default-radio-3"
								className="ms-2 text-sm font-medium cursor-pointer text-gray-900 dark:text-gray-300"
							>
								Unshipped
							</label>
						</div>
					</li>
				</ul>
			</div>
		</div>
	);
}
