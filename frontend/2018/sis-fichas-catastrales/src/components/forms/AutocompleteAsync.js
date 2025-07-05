import { Typeahead,AsyncTypeahead } from 'react-bootstrap-typeahead';
import React, {useState, useEffect} from "react";
const AutocompleAsync = ({SEARCH_URI}) => {

    const [isLoading, setIsLoading] = useState(false);
    const [options, setOptions] = useState([]);

    const handleSearch = (query) => {
        setIsLoading(true);
        fetch(SEARCH_URI)
            .then((resp) => resp.json())
            .then(({ items }) => {
                const options = items.map((i) => ({
                    avatar_url: i.avatar_url,
                    id: i.id,
                    denominacion: i.denominacion,
                }));

                setOptions(options);
                setIsLoading(false);
            });
    };

    // Bypass client-side filtering by returning `true`. Results are already
    // filtered by the search endpoint, so no need to do it again.
    const filterBy = () => true;

    return (
        <AsyncTypeahead
            filterBy={filterBy}
            id="async-example"
            isLoading={isLoading}
            labelKey="login"
            minLength={3}
            onChange={selected => {
                console.log("// onChange");
                console.log(selected);
            }}

            onSearch={handleSearch}
            options={options}
            placeholder="Search for a Github user..."
            renderMenuItemChildren={(option, props) => (
                <>
                    <span>{option.denominacion}</span>
                </>
            )}
        />
    );
};


export default AutocompleAsync;