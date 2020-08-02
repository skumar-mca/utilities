import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import { ManageSearchResult } from 'helpers';
import * as lodash from 'lodash';
import React from "react";
import CustomModal from 'shared-components/CustomModal';
import SavedSearchListComponent from './saved-search-component/index';
import SearchResultComponent from './search-result-component/index';
class DictionaryComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            searchResult: null,
            errorMsg: '',
            noRecordFound: false
        }
    }

    componentDidMount() {
        const nextId = lodash.get(this.props, 'match.params.searchTerm', null);
        if (nextId) {
            this.searchWord(nextId);
        }
    }

    componentWillUpdate(nextProps) {
        const { match } = this.props;
        const prevId = match.params.searchTerm;
        const nextId = nextProps.match.params.searchTerm;
        if (nextId && prevId !== nextId) {
            this.searchWord(nextId);
        }
    }

    handleTextChange = (evt) => {
        this.setState({ value: evt.target.value });
    }

    handleSearchTerm = (evt) => {
        if (evt.key === 'Enter') {
            this.setState({ errorMsg: '' })
            const searchTerm = evt.target.value;
            this.props.history.push(`/dictionary/search/${searchTerm}`)
        }
    }

    handleSearchIconClick = (evt) => {
        evt && evt.preventDefault();
        const { value } = this.state;
        this.props.history.push(`/dictionary/search/${value}`)
        this.setState({ value: '' })
    }

    searchWord = (searchTerm) => {
        const getFromCache = ManageSearchResult.get(searchTerm);
        if (getFromCache) {
            this.setState({ searchResult: getFromCache.result })
            return;
        }

        this.props.searchWord(searchTerm, (resp) => {
            if (resp) {
                const content = {
                    Definitions: resp.definitions,
                    Pronunciation: resp.pronunciation,
                    Word: resp.word
                };

                this.setState({ searchResult: content }, () => {
                    this.getImage(searchTerm);
                })
                ManageSearchResult.add(searchTerm, content);
                this.props.newSearchWordAdded();

                return;
            }
            this.setState({ errorMsg: 'No definition found for given word!!!', searchResult: null, noRecordFound: true })
        })
    }

    getImage = (searchTerm) => {
        this.props.getImg(searchTerm, (resp) => {
            if (resp && resp.meta.status === 200) {
                const Images = {
                    small: lodash.get(resp, 'data[0].images.downsized.url', null),
                    medium: lodash.get(resp, 'data[0].images.downsized_medium.url', null),
                    large: lodash.get(resp, 'data[0].images.downsized_large.url', null),

                }

                const { searchResult } = this.state;
                searchResult.Images = Images;
                ManageSearchResult.add(searchTerm, searchResult);
                this.props.newSearchWordAdded();
            }
        })
    }

    handleShowSelectedResult = ({ key, result }) => {
        this.props.history.push(`/dictionary/search/${key}`)
    }

    handleNoRecordFound = () => {
        this.setState({ noRecordFound: false });
        this.props.history.push(`/dictionary/search`);
    }

    render() {
        const { value, errorMsg, searchResult, noRecordFound } = this.state;
        const classes = {};
        return (
            <>
                {noRecordFound && <CustomModal title="No Definition Found" message={`<span class='text-error'>No definition found with word: <b>${lodash.get(this.props, 'match.params.searchTerm', '')}</b></span>`} handleModalClose={this.handleNoRecordFound} />}
                <Grid container spacing={3}>
                    <Grid item xs={12} md={12} lg={12}>
                        <div className="loader">

                            <TextField
                                id="outlined-full-width"
                                label="Search"
                                placeholder="search word, for example: computers"
                                fullWidth
                                margin="normal"
                                InputLabelProps={{ shrink: true, }}
                                variant="outlined"
                                onKeyPress={this.handleSearchTerm}
                                onChange={this.handleTextChange}
                                value={value}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="start" >
                                            <SearchIcon onClick={this.handleSearchIconClick} />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </div>

                        <SavedSearchListComponent {...this.props} handleShowSelectedResult={this.handleShowSelectedResult} />
                        {searchResult && <SearchResultComponent {...this.props} searchResult={searchResult} />}
                    </Grid>

                </Grid>
            </>

        );
    }
}

export default DictionaryComponent;
