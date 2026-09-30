import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Grid,
  Chip,
  Tooltip,
  Button
} from "@mui/material";

import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PublicIcon from "@mui/icons-material/Public";
import BadgeIcon from "@mui/icons-material/Badge";

export default function About({ mode, setMode }) {

  const socialLinks = [
    {
      name: "Google Scholar",
      icon: <PublicIcon />,
      link: "https://scholar.google.com/citations?user=PB0taZkAAAAJ&hl=en",
      color: "#1a73e8"
    },
    {
      name: "LinkedIn",
      icon: <LinkedInIcon />,
      link: "https://www.linkedin.com/in/deepika-r-a77289151/",
      color: "#0A66C2"
    },
    {
      name: "ORCID",
      icon: <BadgeIcon />,
      link: "https://orcid.org/0009-0009-2778-2165",
      color: "#A6CE39"
    },
    {
      name: "SCOPUS",
      icon: <BadgeIcon />,
      link: " https://www.scopus.com/authid/detail.uri?authorId=57436684500",
      color: "#A6CE39"
    }
   
  ];

  const education = [
    {
      degree: "Ph.D. - ICE",
      year: "2021 - Present",
      institution: "Anna University"
    },
    {
      degree: "M.E - CSE",
      year: "2012 - 2014",
      institution: "Avinashilingam University",
      score: "86%"
    },
    {
      degree: "B.E - CSE",
      year: "2008 - 2012",
      institution: "R.V.S College",
      score: "83%"
    }
  ];

  const experiences = [
    {
      role: "Assistant Professor",
      org: "Christ The King Engineering College",
      period: "2024 – Present"
    },
    {
      role: "Technology Trainer",
      org: "Vinsys Tech Pvt Ltd",
      period: "2022 – 2024"
    },
    {
      role: "Assistant Professor",
      org: "Bannari Amman Institute of Technology (BIT)",
      period: "2018 – 2022"
    },
    {
      role: "Assistant Professor",
      org: "Sree Sakthi Engineering College",
      period: "Earlier"
    }
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />

      <Box sx={{ flexGrow: 1 }}>
        <Topbar mode={mode} setMode={setMode} />

        <Box sx={{ p: 4, background: "#f8fafc", minHeight: "100vh" }}>

          <Typography variant="h4" fontWeight="bold" gutterBottom>
            About Me
          </Typography>

          {/* ✅ FIXED GRID STRUCTURE */}
          <Grid container spacing={4}>

            {/* PROFILE */}
            <Grid item xs={12} md={4}>
              <Card sx={{ textAlign: "center", p: 3, boxShadow: 4 }}>
                <Avatar sx={{ width: 120, height: 120, mx: "auto", mb: 2 }} />

                <Typography variant="h6">Deepika R</Typography>

                <Typography color="text.secondary" sx={{ mb: 2 }}>
                  Assistant Professor | Researcher | Trainer
                </Typography>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  {socialLinks.map((item, i) => (
                    <Tooltip title={item.name} arrow key={i}>
                      <Button
                        variant="outlined"
                        startIcon={item.icon}
                        fullWidth
                        href={item.link}
                        target="_blank"
                        sx={{
                          textTransform: "none",
                          borderColor: item.color,
                          color: item.color,
                          "&:hover": {
                            backgroundColor: item.color,
                            color: "#fff"
                          }
                        }}
                      >
                        {item.name}
                      </Button>
                    </Tooltip>
                  ))}

                  <Button variant="contained" fullWidth sx={{ mt: 1 }}>
                    Download Resume
                  </Button>
                </Box>
              </Card>
            </Grid>

            {/* SUMMARY + SKILLS */}
            <Grid item xs={12} md={8}>
              <Card sx={{ mb: 3, boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h6">Profile Summary</Typography>
                  <Typography>
                    AI & Data Science professional with strong expertise in Java full-stack development. Currently pursuing Ph.D. with focus on AI-driven healthcare systems.
                  </Typography>
                </CardContent>
              </Card>

              <Card sx={{ boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h6">Skills</Typography>

                  {[
                    "Java",
                    "Python",
                    "React",
                    "Machine Learning",
                    "Deep Learning",
                    "Data Science",
                    "Cloud Computing"
                  ].map((skill, i) => (
                    <Chip key={i} label={skill} sx={{ m: 0.5 }} />
                  ))}
                </CardContent>
              </Card>
            </Grid>

          </Grid>

          {/* EXPERIENCE */}
          <Box sx={{ mt: 6 }}>
            <Typography variant="h5" fontWeight="bold">
              Professional Experience
            </Typography>

            <Box sx={{ position: "relative", ml: 2 }}>
              <Box sx={{
                position: "absolute",
                left: "10px",
                top: 0,
                bottom: 0,
                width: "2px",
                background: "#1976d2"
              }} />

              {experiences.map((exp, i) => (
                <Box key={i} sx={{ position: "relative", mb: 4, pl: 5 }}>

                  <Box sx={{
                    position: "absolute",
                    left: "-2px",
                    top: "8px",
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    background: "#1976d2"
                  }} />

                  <Card sx={{ boxShadow: 3 }}>
                    <CardContent>
                      <Typography variant="h6">{exp.role}</Typography>
                      <Typography color="text.secondary">{exp.org}</Typography>
                      <Typography variant="body2">{exp.period}</Typography>

                      {exp.period.includes("Present") && (
                        <Chip label="Current" color="success" size="small" />
                      )}
                    </CardContent>
                  </Card>

                </Box>
              ))}
            </Box>
          </Box>

          {/* EDUCATION */}
          <Box sx={{ mt: 6 }}>
            <Typography variant="h5">Education</Typography>

            <Grid container spacing={3}>
              {education.map((edu, i) => (
                <Grid item xs={12} md={4} key={i}>
                  <Card sx={{ textAlign: "center", p: 2 }}>
                    <SchoolIcon sx={{ fontSize: 40, color: "#1976d2" }} />
                    <Typography variant="h6">{edu.degree}</Typography>
                    <Typography>{edu.year}</Typography>
                    <Typography>{edu.institution}</Typography>
                    {edu.score && <Typography>{edu.score}</Typography>}
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>

        </Box>
      </Box>
    </Box>
  );
}