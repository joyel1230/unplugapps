# unplugapps
# Voucher Entry System

The Voucher Entry System is a web-based application that allows users to enter voucher details, 
including header information and multiple rows of detail information. 
This system validates the input data, saves it into the appropriate database tables, 
and provides a printable version of the saved voucher.

## Features

- User-friendly interface divided into two sections: HEADER and DETAIL.
- The HEADER section displays necessary fields from the header_table.
- The DETAIL section allows entry for multiple rows in the detail_table.
- Dynamically add or remove rows in the DETAIL section to accommodate the entry of multiple rows.
- Data validation ensures that all required fields are filled and the data is in the correct format.
- On submission of the form, the data is saved into the header_table and detail_table in the database.
- Provides a printable version of the saved voucher.

## Technologies Used

- HTML, CSS, JavaScript, React, Redux for the frontend development.
- User-side validation to ensure data integrity.


## Usage

1. Access the application through a web browser.
2. Fill in the necessary fields in the HEADER section.
3. Enter the details for each row in the DETAIL section.
4. Use the [+] button to add more rows and the [-] button to remove rows if needed.
5. Ensure all required fields are filled and the data is in the correct format.
6. Click the [Submit] button to save the voucher data.
7. The data will be stored in the appropriate database tables (header_table and detail_table).
8. A printable version of the saved voucher will be generated.

