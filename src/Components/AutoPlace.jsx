import PlacesAutocomplete from "react-places-autocomplete";
import React from "react";
import { Input } from "antd";

function AutoPlace() {
    const [address, setAddress] = React.useState("");

    const handleSelect = async (value) => {
        setAddress(value);
    };

    return (

        <PlacesAutocomplete
            value={address}
            onChange={setAddress}
            onSelect={handleSelect}
        >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {
                return (
                    <div>
                        <Input {...getInputProps({ placeholder: "Type address" })} />
                        <div>
                            {loading ? <div>Loading</div> : null}
                            {suggestions.map((suggestion, index) => {
                                const style = {
                                    backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
                                };
                                return (
                                    <div
                                        key={`map-${index}`}
                                        {...getSuggestionItemProps(suggestion, { style })}
                                    >
                                        {suggestion.description}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            }}
        </PlacesAutocomplete>

    );
}

export default AutoPlace;