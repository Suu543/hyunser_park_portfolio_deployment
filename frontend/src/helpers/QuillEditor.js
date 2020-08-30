import React from "react";
import ReactQuill from "react-quill";
import { imageUpload } from "../actions/work";
import "../../node_modules/react-quill/dist/quill.snow.css";

const QuillFormats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "link",
  "image",
  "video",
  "code-block",
];

let ImageURL = "";
let ImageKEY = "";
let ImageID = "";

class QuillEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorHtml: "", reference: "" };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(html) {
    console.log("handleChange");
    console.log("html", html);
    this.setState(
      {
        editorHtml: html,
        reference: {
          url: ImageURL,
          key: ImageKEY,
          _id: ImageID,
        },
      },
      () => {
        this.props.onEditorChange(this.state);
      }
    );
  }

  imageHandler() {
    console.log("Image Handler");
    const input = document.createElement("input");

    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      const formData = new FormData();

      formData.append("image", file);

      // Save current cursor state
      const range = this.quill.getSelection(true);

      console.log("range", range);
      // Insert temporary loading placeholder image
      this.quill.insertEmbed(
        range.index,
        "image",
        "https://thumbs.gfycat.com/ElasticHalfAbyssiniancat-size_restricted.gif"
      );

      //   Move cursor to right side of image (easier to continue typing)
      this.quill.setSelection(range.index + 1);
      imageUpload(formData).then((result) => {
        console.log("uploade Result", result);
        // Remove placeholder image
        const { location, key, id } = result.data;
        console.log("result", result.data);
        ImageURL = location;
        ImageKEY = key;
        ImageID = id;

        this.quill.deleteText(range.index, 1);
        console.log("range", range);

        // Insert uploaded image
        this.quill.insertEmbed(range.index, "image", location);
      });
    };
  }

  render() {
    return (
      <div>
        {JSON.stringify(this.state.editorHtml)}
        <hr />
        <ReactQuill
          ref={(el) => {
            this.quill = el;
          }}
          onChange={this.handleChange}
          placeholder={this.props.placeholder}
          modules={{
            toolbar: {
              container: [
                [
                  { header: "1" },
                  { header: "2" },
                  { header: [3, 4, 5, 6] },
                  { font: [] },
                ],
                [{ size: [] }],
                ["bold", "italic", "underline", "strike", "blockquote"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["link", "image", "video"],
                ["clean"],
                ["code-block"],
              ],
              handlers: {
                image: this.imageHandler,
              },
            },
          }}
          formats={QuillFormats}
        />
      </div>
    );
  }
}

export default QuillEditor;
