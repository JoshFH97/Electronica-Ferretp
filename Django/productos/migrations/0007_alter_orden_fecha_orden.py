# Generated by Django 5.1.1 on 2024-11-03 16:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('productos', '0006_orden_fecha_orden_alter_orden_id_usuario'),
    ]

    operations = [
        migrations.AlterField(
            model_name='orden',
            name='fecha_orden',
            field=models.DateField(auto_now_add=True),
        ),
    ]
