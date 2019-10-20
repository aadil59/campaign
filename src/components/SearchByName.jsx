import React from 'react'

export default function SearchByName(props) {
    const {search, Onclicksearch, handleChangeText, isSearchActive} = props;
    return (
        <React.Fragment>
            <div className={isSearchActive === true ? "form-group search-group active" : "form-group search-group"}>
                <input type="text" name="search" className="form-control" placeholder="Search Campaign" value={search} onChange={handleChangeText} />
                <span className="btn-search" onClick={Onclicksearch}><i className="fa fa-search"></i></span>
            </div>
        </React.Fragment>
    )
}
