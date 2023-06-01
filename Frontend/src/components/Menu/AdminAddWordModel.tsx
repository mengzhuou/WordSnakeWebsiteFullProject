import React, { ChangeEvent } from "react";
import { getChatGPTSearchingDefinition, isWordExist, getFromWordAddition } from '../../helpers/connector';
import { TextField } from "@mui/material";
import "./Menu.css";

interface AddWordModelProps {
  onClose: () => void
}

interface AddWordModelState {
  searchingWord: string,
  typedWord: string,
  searchingDefinition: string[],
  wordExist: boolean,
  isWordTyped: boolean
}

class AdminAddWordModel extends React.Component<AddWordModelProps, AddWordModelState> {
  constructor(props: AddWordModelProps) {
    super(props);
    this.state = {
      searchingWord: "",
      typedWord: "",
      searchingDefinition: [],
      wordExist: false,
      isWordTyped: false
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
    console.log("word typeing, ", this.state.isWordTyped)

    this.setState({
      searchingWord: inputString,
      isWordTyped: false
    });
  }

  handleEnterKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {

      this.storeSearchValue(this.state.searchingWord).then(() => {
        this.setState({ searchingWord: ""});
      });
    }
  }

  storeSearchValue = async (inputValue: string) => {
    const exist = await isWordExist(inputValue);
    console.log("word typeing after stored", this.state.isWordTyped)


    this.handleChatGPTSearch(inputValue);
    this.setState({ searchingWord: inputValue, typedWord: inputValue, wordExist: exist, isWordTyped: true })
  }

  render() {
    const { onClose } = this.props;
    const { searchingWord, searchingDefinition, typedWord, wordExist, isWordTyped } = this.state;

    return (
        <div className="addWordModelPopup">
            <button className="fbClose-btn" onClick={onClose}>
                X
            </button>
            
            {/* <div className="searchDefinition">
              {Array.isArray(searchingDefinition) && searchingDefinition.map((definition: string, index: number) => (
                <React.Fragment key={index}>
                    <div className="typedWord">
                        {typedWord.toUpperCase()}
                    </div>
                    {isWordTyped && (
                      <div className="typedWord">
                        {wordExist ? "The word already exists in our database" : "The word does not exist in our database"}
                      </div>
                    )}
                    {definition.split("•").map((line: string, lineIndex: number) => (
                        <p key={lineIndex}>
                            {line}
                        </p>
                        
                    ))}

                </React.Fragment>
              ))}
            </div>       */}
        </div>
    );
  }
}

export default AdminAddWordModel;
