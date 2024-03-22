from django.db import models
from django.contrib.auth.models import User
#from __future__ import unicode_literals


# Create your models here.

class menu_principal(models.Model):
	Eleccion_Estado = (
		("activo","activo"),
		("inactivo","inactivo"),
		("suspendido","suspendido"),
	)

	cod_menu = models.CharField("Codigo de menu", max_length=20)#varchar
	nom_menu = models.CharField("Nombre de menu", max_length=30)#varchar
	estado = models.CharField("Estado de Menu", choices=Eleccion_Estado, max_length=15)
	usuario_creacion = models.ForeignKey(User, on_delete=models.CASCADE, related_name="userCreacionMenu_principal")
	fecha_hora_creacion = models.DateTimeField("Fecha y Hora de Creación",auto_now_add=True)
	usuario_modificacion = models.ForeignKey(User, on_delete=models.CASCADE, related_name="usermodMenu_principal",null=True, blank=True)
	fecha_hora_modificacion = models.DateTimeField("Fecha y Hora de Modificación",null=True, blank=True)

	class Meta:
		verbose_name = 'menu principal'
		verbose_name_plural = 'menu principal'

	def __str__(self):
		return "%s" % (self.nom_menu)


class item(models.Model):
	cod_item= models.CharField("Codigo de item", max_length=20)
	nom_item = models.CharField("Nombre de Item", max_length=30)#varchar
	estado = models.CharField("Estado de Item", choices=menu_principal.Eleccion_Estado, max_length=15)
	usuario_creacion = models.ForeignKey(User, on_delete=models.CASCADE, related_name="userCreacionItem")
	fecha_hora_creacion = models.DateTimeField("Fecha y Hora de Creación",auto_now_add=True)
	usuario_modificacion = models.ForeignKey(User, on_delete=models.CASCADE, related_name="usermodItem",null=True, blank=True)
	fecha_hora_modificacion = models.DateTimeField("FechaHoraModificacionSubitem",null=True, blank=True)
	estado = models.CharField("Estado de Menu", choices=menu_principal.Eleccion_Estado, max_length=15)
	id_menu = models.ForeignKey(menu_principal, on_delete=models.CASCADE)

	class Meta:
		verbose_name = 'item'
		verbose_name_plural = 'items'

	def __str__(self):
		return "%s" % (self.nom_item)

class sub_item(models.Model):
	cod_subitem= models.CharField("Codigo de Sub-Item", max_length=20)
	nom_SubItem = models.CharField("Nombre de Sub-Item", max_length=30)#varchar
	estado = models.CharField("Estado de Sub-Item", choices=menu_principal.Eleccion_Estado, max_length=15)
	usuario_creacion = models.ForeignKey(User, on_delete=models.CASCADE, related_name="userCreacionSubItem")
	fecha_hora_creacion = models.DateTimeField("Fecha y Hora de Creación",auto_now_add=True)
	usuario_modificacion = models.ForeignKey(User, on_delete=models.CASCADE, related_name="usermodSubitem",null=True, blank=True)
	fecha_hora_modificacion = models.DateTimeField("FechaHoraModificacionSubitem",null=True, blank=True)

	id_item=models.ForeignKey(item, on_delete=models.CASCADE)

	def __str__(self):
		return "%s-%s" % (self.cod_subitem, self.nom_SubItem)