import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

const ComboOptions = ({data, valorkey, valornombre}) => {
    if (data.length>0) {
        return (
            <>
                {data.map((value) =>
                    <option key={value[`${valorkey}`].toString()} value={value[`${valorkey}`].toString()}>
                        {value[`${valornombre}`].toString()}
                    </option>
                )}

            </>
        );
    } else {
        return (
            <>
            </>
        );
    }

};

export default ComboOptions;