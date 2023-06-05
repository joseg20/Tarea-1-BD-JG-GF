# Personas:
* Persona cuando se crea debe estar anidado a un reino y un trabajo

* Se puede buscar por todos y por id.

* Persona cuando se borra no afecta al reino

* Persona cuando se borra afecta al trabajo

* Persona cuando se updatea no afecta al reino

* Persona cuando se updatea afecta al trabajo

* persona solo updatea los parametros de su tabla

* Independiente de auto

# Karts:
* Auto es independiente para todo
* Se puede crear con una persona o updatear hacia una persona

# Trabajos:
* Si se busca cambiar parametros del trabajo de un personaje primero se recomienda hacer un get al id del personaje para buscar los id de los trabajos que tiene y hacer el update respectivo.

* No se puede crear independientemente solo a traves de la conexion de la persona.

* Se puede buscar independientemente todos y por id.

* Los trabajos deben ser eliminados cuando todos los usuarios que trabajaban en el updatearon a otra cosa, esto lo deberia configurar el que consume la API viendo por GET por algun horario especificado si es que los trabajos estan vacios y eliminarlo para  cumplir con la relacion uno a muchos mutua entre persona y usuario.

# Reinos:
* Reino cuando se crea tiene una persona inicial el cual es el fundador y una defensa.

* Reino es independiente de diplomacia, por lo que puede que tenga o no aliados.

* Reino cuando se borra, se borra con todas las personas, por lo que se recomienda que las personas se muden a otro reino.

* Reino cuando se updatea, solo puede afectar datos de diplomacia y defensa.

# Diplomacias:
* Dependiente de reinos

* la diplomacia cuando se crea es solo 1 vez por reino. (solo reino1-reino2, no viceversa) 

# Defensas:
* 