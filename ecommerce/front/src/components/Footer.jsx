import React from "react";
import {
  Box,
  Container,
  Typography,
  Link,
  Stack,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#13555E",
        color: "primary.contrastText",
        pt: 6,
        pb: 3,
      }}
    >
      <Container maxWidth="lg">
        {/* Parte superior: Nombre y columnas */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={4}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", md: "flex-start" }}
          mb={4}
        >
         
          <Box sx={{ minWidth: 150}  }>
            <Typography variant="h6" fontWeight="bold" gutterBottom sx={{pb:1}  }>
              Pawtitas
            </Typography>
          
            <Typography sx={{pb:2}  }>
            En Pawtitas mimamos a tu mascota como se merece. <br />Juguetes, alimentos y mucho amor para que tu perro <br /> o gato disfrute cada momento al máximo.
            </Typography>     
                      
            <Stack direction="row" >
              <IconButton
                component="a"
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                color="inherit"
                size="small"
                sx={{ p: 0 }}
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                component="a"
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                color="inherit"
                size="small"
                
              >
                <TwitterIcon />
              </IconButton>
              <IconButton
                component="a"
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                color="inherit"
                size="small"
              >
                <InstagramIcon />
              </IconButton>
              <IconButton
                component="a"
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                color="inherit"
                size="small"
              >
                <LinkedInIcon />
              </IconButton>
            </Stack>  
           </Box>

          {/* Columnas con links y suscripción */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 3, sm: 6, md: 8 }}
            flexGrow={1}
            justifyContent="flex-end"
            flexWrap="wrap"
          >
            {/* Shop */}
            <Box>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Shop
              </Typography>
              <Stack spacing={1}>
                <Link href="#" color="inherit" underline="hover">
                  Alimentos
                </Link>
                <Link href="#" color="inherit" underline="hover">
                  Juguetes
                </Link>
                <Link href="#" color="inherit" underline="hover">
                  Accesorios
                </Link>
              </Stack>
            </Box>

            {/* Help */}
            <Box>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Help
              </Typography>
              <Stack spacing={1}>
                <Link href="#" color="inherit" underline="hover">
                  FAQ
                </Link>
                <Link href="#" color="inherit" underline="hover">
                  Envíos
                </Link>
                <Link href="#" color="inherit" underline="hover">
                  Devoluciones
                </Link>
              </Stack>
            </Box>

            {/* Sobre Nosotros */}
            <Box>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Sobre Nosotros
              </Typography>
              <Stack spacing={1}>
                <Link href="#" color="inherit" underline="hover">
                  Nuestra Historia
                </Link>
                <Link href="#" color="inherit" underline="hover">
                  Equipo
                </Link>
                <Link href="#" color="inherit" underline="hover">
                  Contacto
                </Link>
              </Stack>
            </Box>

            {/* Suscripción */}
            <Box sx={{ minWidth: 250 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Suscribite
              </Typography>
              <Stack direction="row" spacing={1}>
                    <TextField variant="filled" size="small" placeholder="Tu email"
                        sx={{
                            backgroundColor: "white",
                            borderRadius: 1,
                            flexGrow: 1,
                            '& .MuiFilledInput-input': {
                                padding: '4px 8px', // controla el padding interno aquí
                                // height: '2rem',
                                // boxSizing: 'border-box',
                            },
                        }}
                    />

                <Button variant="contained" size="small" sx={{backgroundColor: "#4ECDC4"}}>
                  Enviar
                </Button>
              </Stack>
            </Box>
          </Stack>
        </Stack>

        {/* Parte inferior: derechos reservados */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          pt={3}
          borderTop={1}
          borderColor="#4ECDC4"
        >
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            © 2025 Pawtitas. Todos los derechos reservados.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
