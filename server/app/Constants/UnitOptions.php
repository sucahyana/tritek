<?php

namespace App\Constants;

use PhpUnitsOfMeasure\PhysicalQuantity\Mass;
use PhpUnitsOfMeasure\PhysicalQuantity\Length;

class UnitOptions
{
	public static $massUnits = [
		'mg', 'g', 'kg', 't', 'oz', 'lb', 'quintal'
	];

	public static $lengthUnits = [
		'mm', 'cm', 'dm', 'm', 'dam', 'hm', 'km', 'inch', 'foot', 'yd', 'mile'
	];

	public static $otherUnits = [
		'roll', 'sheet', 'rod', 'pack', 'box', 'bottle', 'sack', 'can', 'piece'
	];

	public static function convertToKilograms($quantity, $unit)
	{
		if (in_array($unit, self::$massUnits)) {
			$mass = new Mass($quantity, $unit);
			return $mass->toUnit('kg');
		} elseif (in_array($unit, self::$lengthUnits)) {
			$length = new Length($quantity, $unit);
			return $length->toUnit('m') * 1000;
		}
		return $quantity;
	}
}
