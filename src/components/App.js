import "./App.css";
import React, { Fragment } from "react";
import ReactMarkdown from "react-markdown";
// import { Controlled as CodeMirror } from "react-codemirror2";
// import { PDFViewer } from "@react-pdf/renderer";
// import ReactPDF from "@react-pdf/renderer";

import html2canvas from "html2canvas";
import * as jsPDF from "jspdf";

import logo from "../assets/images/logo.png";

import Document from "./Document";

const initText = `# Welcome to Binary Crystal Notepad
#### This can help you create formated document with easy.
        
This utility is developed in **React**
Here are some of its useful features
* Offline
* Free 
* No ads
* Awesome
* Download note ad pdf.

Hope you will enjoy working with it.
[Follow me on Github](https://www.github.com/shivampip)`;

function putNewLine(text) {
	return text.replace(/\n/gi, "\n \n");
}

class App extends React.Component {
	state = {
		text: initText,
	};

	handleChange = (eve) => {
		let value = eve.target.value;
		// value = putNewLine(value);
		this.setState({ text: value });
	};

	componentDidMount() {}

	downloadPdf = (eve) => {
		const input = document.getElementById("mkOutput");
		html2canvas(input).then((canvas) => {
			const imgData = canvas.toDataURL("image/png");
			const pdf = new jsPDF();
			// pdf.text("Hello", 10, 10);
			pdf.addImage(imgData, "PNG", 0, 0);
			pdf.save("note.pdf");
		});
	};

	downloadPdf2 = (eve) => {
		var divContents = document.getElementById("mkOutput").innerHTML;
		var printWindow = window.open("", "", "height=600,width=700");
		printWindow.document.write(
			"<html><head><title>Created using Binary Crystal Markdown Notepad</title>"
		);
		printWindow.document.write("</head><body style='padding: 20px;'>");
		printWindow.document.write(divContents);
		printWindow.document.write("</body></html>");
		printWindow.document.close();
		printWindow.print();
	};

	// Looing good. Take a look
	// https://www.npmjs.com/package/react-markdown-editor-lite
	render() {
		return (
			<div className="wrapper">
				<div className="left">
					<div className="cardHeader">
						<img src={logo} className="logo" />
						<h3>Markdown Notepad</h3>
						<div className="btnGroup">
							<button className="btn" onClick={this.downloadPdf2}>
								Print
							</button>
							<button className="btn" onClick={this.downloadPdf}>
								Download as PDF
							</button>
						</div>
					</div>
					<div className="card">
						<textarea
							id="markdown-content"
							onChange={this.handleChange}
							defaultValue={this.state.text}
						/>
					</div>
				</div>
				<div className="right">
					{/* <div className="cardHeader">Output</div> */}
					<div className="card" id="outputCard">
						<div id="mkOutput">
							<ReactMarkdown
								className="outputD"
								source={putNewLine(this.state.text)}
								escapeHtml={false}
							/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
