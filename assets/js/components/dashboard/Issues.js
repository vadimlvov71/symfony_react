import axios from "axios";
import React from "react";
import { useHistory } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
const baseURL = "/api_portal/issues";

export default function Issues() {
	const history = useHistory();
	const [issues, setIssue] = React.useState(null);
	const [isLoading, setIsLoading] = React.useState(true);
	////////
	const handleRoute = (brand_url) =>{ 
		history.push("?brand=" + brand_url);
	}
	//setIsLoading(true);
  	React.useEffect(() => {
    	axios.get(baseURL).then((response) => {
			setIssue(response.data);
        	console.log(response.data);
			setIsLoading(false);
    	});
  }, []);

  if (!issues) return null;

  return (
    <div>
	<div className="card">
		
		<div id="collapseOne" className="collapse show" data-parent="#accordionExample">
			<div className="card-body">
				<div className="shop__sidebar__categories">
					<Title>Readmine: Issues</Title>
                    <Table size="small" aria-label="customized table">
						{isLoading ? (
							<p>Loading ...</p>
						) : (
							issues.issues.map((issue) =>
							<TableBody>
								<TableRow key="1">
									<TableCell align="right">id:</TableCell><TableCell sx={{color: 'primary.main',}}> {issue.id}</TableCell>
								</TableRow>
								<TableRow key="2">
									<TableCell align="right">subject:</TableCell><TableCell sx={{color: 'primary.main',}}> {issue.subject}</TableCell>
								</TableRow>
								<TableRow key="3">
									<TableCell align="right">description:</TableCell><TableCell sx={{color: 'primary.main',}}> {issue.description}</TableCell>
								</TableRow>
								<TableRow key="4">
									<TableCell align="right">author:</TableCell><TableCell sx={{color: 'primary.main',}}> {issue.author.name}</TableCell>
								</TableRow>
								<TableRow key="5">
									<TableCell align="right">status:</TableCell><TableCell sx={{color: 'primary.main',}}> {issue.status.name}</TableCell>
								</TableRow>
								<TableRow key="6">
									<TableCell align="right">created on:</TableCell><TableCell sx={{color: 'primary.main',}}> {issue.created_on}</TableCell>
								</TableRow>
								<TableRow key="7">
									<TableCell align="right">priority:</TableCell><TableCell sx={{color: 'primary.main',}}> {issue.priority.name}</TableCell>
								</TableRow>
							</TableBody>
							
						)
					)}
					</Table>
				</div>
			</div>
		</div>
	</div>		
    </div>
  );
}

