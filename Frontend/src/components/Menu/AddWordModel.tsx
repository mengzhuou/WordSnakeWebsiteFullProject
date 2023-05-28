import React, { ChangeEvent } from "react";
import Draggable from 'react-draggable';
import { getChatGPTSearchingDefinition } from '../../helpers/connector';
import { TextField } from "@mui/material";
import "./Menu.css";

interface FeedbackModelProps {
  onClose: () => void
}

interface FeedbackModelState {
  searchingWord: string,
  searchingDefinition: string[]
}

class AddWordModel extends React.Component<FeedbackModelProps, FeedbackModelState> {
  constructor(props: FeedbackModelProps) {
    super(props);
    this.state = {
      searchingWord: "",
      searchingDefinition: []
    };
  }

  handleChatGPTSearch = async (searchingWord: string) => {
    const res = await getChatGPTSearchingDefinition(searchingWord);
    if (Array.isArray(res)) {
      this.setState({ searchingDefinition: res });
    } else {
      console.error('Expected an array from getChatGPTSearchingDefinition, got:', res);
    }
  }

  handleSearchValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputString = event.target.value;
    console.log("value changing", inputString)

    this.setState({
      searchingWord: inputString,
    });
  }

  handleEnterKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      console.log("Key down")
      this.storeSearchValue(this.state.searchingWord).then(() => {
        this.setState({ searchingWord: "" });
      });
    }
  }

  storeSearchValue = async (inputValue: string) => {
    this.handleChatGPTSearch(inputValue);
    this.setState({ searchingWord: inputValue })
  }

//   handleAddWordModelSubmit = () => {
//     onSubmit();
//   }

  render() {
    const { onClose } = this.props;
    const { searchingWord, searchingDefinition } = this.state;

    return (
    //   <Draggable>
        <div className="addWordModelPopup">
            <button className="fbClose-btn" onClick={onClose}>
                X
            </button>
            <div className="searchWord">
              <TextField
                label={`Search word online: `}
                value={searchingWord}
                onChange={this.handleSearchValueChange}
                onKeyDown={this.handleEnterKeyDown}
              />
            </div>
            <div className="searchDefinition">
              {Array.isArray(searchingDefinition) && searchingDefinition.map((definition: string, index: number) => (
                <React.Fragment key={index}>
                    {definition.split("•").map((line: string, lineIndex: number) => (
                        <p key={lineIndex}>
                            {line}
                        </p>
                        
                    ))}

                </React.Fragment>
              ))}

            </div>      
            {/* <button type="submit" className="fbSubmitButton">Submit</button> */}
        </div>
    //   </Draggable>
    );
  }
}

export default AddWordModel;
